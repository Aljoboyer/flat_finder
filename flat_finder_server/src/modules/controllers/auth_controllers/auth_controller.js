const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserCollection = require("../../../models/user");
const TempPasswordCollection = require("../../../models/tempPassword");
const { sendEmail } = require("../../../services/mailerService");
const { generatePassword } = require("../../../helper/generatePassword");

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

//Sending reset password link 
const resetLinkController =  async (req, res) => {
    try {
      console.log('hitted', req.body.email)
      const userEmail = req.body.email;
      const userWithEmail = await UserCollection.findOne({email: userEmail})

      if(!userWithEmail?.email){
        res.send({msg: "User Doesn't Exist with this email"})
        return;
      }
      const temp_password = generatePassword();

      const subject = 'Flat Finder: Password Reset Request'
      const email_Body = `<h1>Reset Password</h1>
      <h2>Hello,</h2>
      <p>We have received your reset password request!</p>
      <p></p>
      <p>If you have lost your password and wish to reset it, click on the link below to reset it</p>
      <p></p>
      <p><a href="${process.env.URL_HOST}/forgot-password/${userEmail}"> Reset Password</a></p>
      <p>Your temporary password: ${temp_password}</p>
      <p>If you did not request for a password reset, you can safely ignore this email. Only a person with access to your email can reset your account password.</p>
      </div>`

      const addTempPassToDB = await TempPasswordCollection.create({email: userEmail, temp_password: temp_password})

      const emailSendRes = await sendEmail(userEmail, subject, email_Body)
    
      res.send({msg: 'Link Send Successfully'})
      
    } catch (error) {
      res.send({msg: 'failed', error})
    }
}

  module.exports = {
    signUpController,
    loginController,
    resetLinkController
  };
  