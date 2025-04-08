import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js'


//To Register
export const register = async (req, res)=> {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.json({success: false, message:'Missing'})
    }

    try{
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.json({success: false, message:'User Already Exists'})
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const user = new userModel({name, email, password:hashedPass});
        await user.save();

        // To Generate a token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60  * 60 * 1000
        });


        //To send a welcome mail
        const mailOptions ={
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to my Website Buddy',
            text: `Welcome to my world. you have created a accout using this mail id :${email}`
        }

        await transporter.sendMail(mailOptions);

        return res.json({success: true});

    }catch(error){
        res.json({success:false, message: error.message})
    }
}

//To Login
export const login = async(req, res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.json({success: false, message: 'Email & Password are Required'})
    }
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message: 'Invalid Email'})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success:false, message: 'Invalid password'})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60  * 60 * 1000
        });

        return res.json({success: true});


    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

// To Logout 
export const logout = async(req, res)=>{
    try {
        res.clearCookie('token', {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        return res.json({success:true, message:'Logged Out'})


    } catch (error) {
        return res.json({success: false, message: error.message}) 
    }
}

//To send verification otp to the user mail
export const sendOtp = async (req,res)=>{
    try {
        const {userID} = req.body;

        const user = await userModel.findById(userID);

        if(user.isAccountVerified){
           return  res.json({success:false, message: "Account Verified Already"}) 
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000 

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Your OTP is ${otp}. Verify your account with this given OTP `
        }
        await transporter.sendMail(mailOptions);

        res.json({success: true, message: 'Verification OTP sent through mail successfully'})

        
    } catch (error) {
        return res.json({success: false, message: error.message})  
    }
}

//To Check the mailVerification
export const mailVerification = async (req,res)=>{
    const {userID, otp} = req.body;

    if(!userID || !otp){
        return res.json({success: false, message: 'Missing Details'});
    }

    try {
        const user = await userModel.findById(userID);

        if(!userID){
            return res.json({success: false, message: 'User Not Found'});
        }

        if(user.verifyOtp === '' || user.verifyOtp !== otp){
            return res.json({success: false, message: 'Invalid OTP'});
        }

        if(user.verifyOtpExpireAt < Date.now()){
            return res.json({success: false, message: 'OTP Expired'});
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();
        return res.json({success: true, message: 'Email Verified Successfully'});

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

//To Check whether Authenticated or not
export const isAuthenticated = async (req,res)=>{
    try {
        return res.json({success: true});
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

// To Send otp for Reset Password
export const sendResetOtp = async  (req, res)=>{
    const {email} = req.body;

    if(!email){
        return res.json({success:false, message:'Email is Required'})
    }

    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:'User Not Found'})
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000 

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Reset Password',
            text: `To Reset your password & the OTP is ${otp}. Verify your account with this given OTP `
        }
        await transporter.sendMail(mailOptions);

        res.json({success: true, message:'OTP send to your mail id'})

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

//To Reset the Password
export const resetPassword = async (req, res)=>{
    const {email,otp,newPass} = req.body;

    if(!email || !otp || !newPass){
       return res.json({success:false, message: 'Email, Otp, New Password Required'})
    }

    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message: 'User Not Found'})
        }
        
        if(user.resetOtp === "" || user.resetOtp !== otp){
            return res.json({success:false, message: 'Invalid OTP'})
        }

        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success:false, message: 'OTP Has Expired'})
        }

        const hashedPassword = await bcrypt.hash(newPass, 10);
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt= 0;
        await user.save();

        return res.json({success:true, message:'Password Reset Successfully'})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
} 