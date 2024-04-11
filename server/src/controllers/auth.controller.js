import { User } from "../models/user.model.js";
import {handleErrors} from '../utils/error.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
 

  try {
   /*  if (!(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(username) && /\d/.test(username) && username.length > 5)) {
      return res.status(400).json({ message: "Username must contain at least one special character or number and be greater than 5 characters" });
    } */
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const {  email, password } = req.body;
   

    const user = await User.findOne({ email });
    if (!user) {
      return next(handleErrors(401,`User not found`))
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(handleErrors(401,`wrong credentials
      `))
    }

   
    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });
    
  } catch (error) {
    next(error);
  }
};

