const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserCollection = require("../../../models/user");
const { successResponse, errorResponse } = require("../../../helper/responseHandler");

const SecretKey = process.env.SECRETKEY;

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserCollection.findOne({ email: email });
    
    if (!oldUser)
      return res.status(400).json({ message: "User doesn't exist with this email" });


    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, SecretKey,  {
      expiresIn: "8h",
    });

    res.status(201).json({ result: oldUser, msg: "Successfully LoggedIn", token });
  } catch (error) {
      return res.send({ message: "Something Went Wrong" , error});
  }
};

// User Signup
const signUpController = async (req, res) => {
  
    const requestData = req.body;
    const { email, password , propertyName, phone, role} = requestData;

    try {
      const oldUser = await UserCollection.findOne({
        $or: [{ email: email }, { phone: phone }]
      });

      if (oldUser?.email == email) {
        return res.status(400).json({ message: "User already exists with this email", emailErr: true });
      }
      
      if (role == 'seller') {
        const isPropertyNameExists = await UserCollection.findOne({propertyName: propertyName});
        if(isPropertyNameExists){
          return res.status(400).json({ message: "An account with this property name has already been opened.", propertyErr: true });
        }
      }
  
      if (oldUser?.phone == phone) {
    
        return res.status(400).json({ message: "An account with this phone no. has already been opened." , phoneErr: true});
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
        return res.send({ message: "Something Went Wrong" , error});
    }
  };

  module.exports = {
    signUpController,
    loginController
  };
  