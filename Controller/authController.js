import bcrypt from "bcrypt";
import { ApiError } from "../Utils/apiError.js";
import JsonWebToken from "jsonwebtoken";
import User from "../Model/User.js";
import dotenv from "dotenv";
import OTP from "../Model/OTP.js";
import { mailSender } from "../Utils/mailSender.js";
dotenv.config({ path: "config/config.env" });
import Randomstring from "randomstring";

///////////////////////////////////REGISTER TO SYSTEM ////////////////////////////////////////////////
function generateOTP() {
  return Randomstring.generate({
    length: 4,
    charset: "numeric",
  });
}

export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email: email });
    if (user.otp == otp) {
      await User.findByIdAndUpdate(user.id, { recieved: otp }, { new: true });
      res
        .status(200)
        .json({ success: true, message: "OTP verification successful" });
    } else {
      res.status(400).json({ success: false, error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, phone, email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      const otp = generateOTP();
      await mailSender({
        to: email,
        subject: "Verification Email",
        message: `<h1>Please confirm your OTP</h1>
               <p>Here is your OTP code: ${otp}</p>`,
      });
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone,
        otp: otp,
      });
      await newUser.save();
      res.status(200).json({ success: true, message: "OTP sent successfully" });
    } else if (user) {
      if (user.otp == user.recieved) {
        res.status(200).json({
          success: false,
          message: "Sorry this Email is used before ",
        });
      } else {
        const otp = generateOTP();
        await mailSender({
          to: email,
          subject: "Verification Email",
          message: `<h1>Please confirm your OTP</h1>
               <p>Here is your OTP code: ${otp}</p>`,
        });
        await User.findByIdAndUpdate(user.id, { otp: otp }, { new: true });
        res
          .status(200)
          .json({ success: true, message: "OTP sent successfully" });
      }
    }
  } catch (error) {
    return next(new ApiError(`System Error ${error}`, 404));
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new ApiError("User not found!", 404));
    } else {
      if (user.otp == user.recieved) {
        const isPasswordCorrect = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!isPasswordCorrect) {
          return next(new ApiError("password isn't correct", 422));
        }

        const token = JsonWebToken.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT
        );
        const { password, isAdmin, ...otherDetails } = user._doc;
        res
          .cookie("accessToken", token, {
            httpOnly: false,
            secure: true,
            sameSite: "Strict",
          })
          .status(200)
          .json({ details: { ...otherDetails }, isAdmin, token: token });
      }else{
        return next(new ApiError("You Should Active your account", 300));
      }
    }
  } catch (error) {
    return next(new ApiError(`System Error ${error}`, 404));
  }
};

// Middleware to check if the token is valid and to log out the user
export const logout = async (req, res, next) => {
  try {
    // Clear the token from the cookies
    res.cookie("accessToken", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};
