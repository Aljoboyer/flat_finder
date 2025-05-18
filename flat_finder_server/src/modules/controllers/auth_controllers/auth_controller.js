const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserCollection = require("../../../models/user");

const SecretKey = process.env.SECRETKEY;

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserCollection.findOne({ email });
    
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist with this email" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, SecretKey,  {
      expiresIn: "8h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" , error});
    console.log(error);
  }
};

// User Signup
const signUpController = async (req, res) => {
  
    const requestData = req.body;
    const { email, password } = requestData;

    try {
      const oldUser = await UserCollection.findOne({ email: email });
  
      if (oldUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await UserCollection.create({
        ...requestData,
        password: hashedPassword,
      });
  
    const token = jwt.sign({ email: result.email, id: result._id }, SecretKey ,{
      expiresIn: "8h",
    });

    res.status(201).json({ result, token });

    } catch (error) {
      res.status(500).json({ message: "Something went wrong" , error});
      console.log(error);
    }
  };

  module.exports = {
    signUpController,
    loginController
  };
  