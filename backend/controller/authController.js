import User from "../model/userModel.js";
import validator from 'validator'
import bcrypt from 'bcryptjs'
import { genToken, genToken1 } from "../config/token.js";


export const registration = async (req, res) =>{
    try{
        const {name, email, password}= req.body;
        const existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"User already exist"})
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Enter valid Email"})
        }
        if(password.length < 8){
            return res.status(400).json({message:"Enter Strong password"})
        }
        let hashPassword = await bcrypt.hash(password,10)

        const user = await User.create({name,email,password:hashPassword})
        let token = await genToken(user._id)
        // res.cookie("token",token,{
        //     httpOnly:true,
        //     secure:true,
        //     sameSite:"none",
        //     maxAge: 7 * 24 * 60 * 60 * 1000
        // })
        res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // ✅ true on Render
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ✅ important
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

        return res.status(201).json(user)
    }catch(error){
        console.log("registration error")
        return res.status(500).json({message:`registration error ${error}`})
    }
}


export const login = async (req,res) =>{
    try {
        let  {email, password} = req.body;
        let user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){  // Changed this condition
            return res.status(400).json(user)
        }

        let token = await genToken(user._id)
        // res.cookie("token",token,{
        //     httpOnly:true,
        //     secure:true,
        //     sameSite:"none",
        //     maxAge: 7 * 24 * 60 * 60 * 1000
        // })
        res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // ✅ true on Render
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ✅ important
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

        return res.status(200).json({  // Changed status to 200
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
                // Include other non-sensitive fields as needed
            }
        })

    } catch (error) {
        console.log("Login error:", error)
        return res.status(500).json({message: "Login failed", error: error.message})
    }
}

export const logOut = async (req,res) => {
try {
    res.clearCookie("token")
    return res.status(200).json({message:"logOut Successful"})
} catch (error) {
    console.log("logOut error")
        return res.status(500).json({message:`logOut error ${error}`})
}
}

export const googleLogin = async (req,res) => {
    try {
        let {name, email} = req.body
        let user = await User.findOne({email})
        if(!user){
          user = await User.create({
            name,email
        })
        }
       
        let token = await genToken(user._id)
        // res.cookie("token",token,{
        //     httpOnly:true,
        //     secure:true,
        //     sameSite:"none",
        //     maxAge: 7 * 24 * 60 * 60 * 1000
        // })
        res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // ✅ true on Render
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ✅ important
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

        return res.status(200).json({  // Changed status to 200
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
               
            }
        })
    } catch (error) {
         console.log("Google login error")
        return res.status(500).json({message:`google login error ${error}`})
    }
}

export const adminLogin = async(req,res)=>{
    try {
        let {email , password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === 
            process.env.ADMIN_PASSWORD){
                let token = await genToken1(email)
        //     res.cookie("token",token,{
        //     httpOnly:true,
        //     secure:true,
        //     sameSite:"none",
        //     maxAge: 7 * 24 * 60 * 60 * 1000
        // })
            res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // ✅ true on Render
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ✅ important
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

          return res.status(200).json({
        // message: "Admin login successful",
        // token
        message: "Admin login successful",
  admin: { email }
      });
            }
        return res.status(400).json({message:"Invalid Credentials"})
    } catch (error) {
        console.log("AdminLogin Error")
         return res.status(500).json({message:
            `Admin login error ${error}`})
    }
}
