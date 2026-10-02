
const getCookieOptions = require("../lib/cookieOptions");
const User = require("../models/user.model")
const generateToken = require("../lib/utils")
const bcrpyt = require("bcryptjs")
const v2 = require("../lib/cloudinary")
const signup = async (req, res) => {
    const { fullName, password, email, profilePic } = req.body
    try {
        if (!fullName || !password || !email) {
            return res.status(400).json({
                msg: "All fields are not filled"
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                msg: "Password must be at least 6 characters"
            })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                msg: "User already exists with this email"
            })
        }
        const salt = await bcrpyt.genSalt(10)
        const hashPass = await bcrpyt.hash(password, salt)
        const newUser = new User({
            fullName, email, profilePic, password: hashPass
        })
        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save()
            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName, email: newUser.email, profilePic: newUser.profilePic
            })
        } else {
            return res.status(400).json({
                msg: "Invalid user data"
            })

        }
    } catch (error) {
        console.log("error in signing up : ", error)
        return res.status(500).json(
            {
                msg: "Internal server Error Error"
            }
        )
    }
    res.send({
        msg: "signup route",
        status: "200"
    })
}
const login = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({
                msg: "Fill all the fields first"
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                msg: "User dont exists with this email"
            })
        }
        const isPassCorrect = await bcrpyt.compare(password, user.password)
        if (!isPassCorrect) {
            return res.status(400).json({
                msg: "Invalid password"
            })
        }
        generateToken(user._id, res)
        res.status(200).json({
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            _id: user._id
        })
    } catch (error) {
        console.log("Error :", error)
        res.status(500).json({
            msg: "Interal server error"
        })
    }


}
const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {
            ...getCookieOptions(),
            maxAge: 0,
        });

        res.status(200).json({
            msg: "Successfully logged out"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};

const profile = async (req, res) => {
    const { profilePic } = req.body;
    const userId = req.user._id;
    try {
        if (!profilePic) {
            return res.status(400).json({
                msg: "Profile Pic required"
            })
        }
        const uploadResponse = await v2.uploader.upload(profilePic);
        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );
        res.status(200).json({
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            profilePic: updatedUser.profilePic,
            _id: updatedUser._id
        })

    } catch (error) {
        res.status(500).json({
            msg: "Interal server error"
        })
    }
}
const checkAuth = (req, res) => {
    try {
        const user = req.user
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            msg: "Interal server error"
        })
    }
}
module.exports = { signup, login, logout, profile, checkAuth }