const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
    try {
        const {username, email, password} = req.body
        if(!username || !email || !password) {
            return res.status(400).json({success: false, message: "All fields are required"})
        }
        if(username.length < 5){
            return res.status(400).json({success: false, message: "Username must be at least 5 characters"})
        }
        if(password.length < 6){
            return res.status(400).json({success: false, message: "Password must be at least 6 characters"})
        }
        const existingEmail = await User.findOne({email})
        const existingUsername = await User.findOne({username})
        if(existingEmail || existingUsername) {
            return res.status(400).json({success: false, message: "User with this email or username already exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        await newUser.save()
        return res.status(201).json({success: true, message: "User registered successfully", newUser})
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal Server Error"})
    }
}

const loginController = async (req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password) {
            return res.status(400).json({success: false, message: "All fields are required"})
        }
        const existingUser = await User.findOne({email})
        if(!existingUser) {
            return res.status(400).json({success: false, message: "Invalid Credentials"})
        }
        const isMatch = await bcrypt.compare(password, existingUser.password)
        if(!isMatch) {
            return res.status(400).json({success: false, message: "Invalid Credentials"})
        }
        const token = jwt.sign({id: existingUser._id, email: existingUser.email}, process.env.JWT_SECRET, {expiresIn: "30d"})
        res.cookie("podcasterUserCookie", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
            maxAge: 30 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({success: true, message: "User logged in successfully", id: existingUser._id, username: existingUser.username, email: email})
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal Server Error"})
    }
}

const logoutController = async (req, res) => {
    try {
        res.clearCookie("podcasterUserCookie", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
            maxAge: 0,
          });
        return res.status(200).json({success: true, message: "User logged out successfully"})
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal Server Error"})
    }
}

const checkCookieController =  (req, res) => {
    const userCookie = req.cookies.podcasterUserCookie;
    if (!userCookie) {
      return res.status(401).json({ message: 'No cookie found, please log in' });
    }
    try {
      const decoded = jwt.verify(userCookie, process.env.JWT_SECRET);
      res.status(200).json({ message: 'User authenticated', user: decoded });
    } catch (error) {
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  }

const userDetailsController = async (req, res) => {
    try {
        const {email} = req.user
        const existingUser = await User.findOne({email}).select("-password")
        return res.status(200).json({success: true, message: "User details fetched successfully", existingUser})
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal Server Error"})
    }
}

module.exports = {registerController, loginController, logoutController, checkCookieController, userDetailsController}