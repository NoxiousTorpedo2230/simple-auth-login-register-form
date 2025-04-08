import express from 'express';
import { login, logout, mailVerification, register, sendOtp, isAuthenticated, sendResetOtp, resetPassword } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

//Register
authRouter.post('/register', register);

//Login
authRouter.post('/login', login);

//Logout
authRouter.post('/logout', logout);

//To verify OTP
authRouter.post('/send-verify-otp', userAuth, sendOtp);

//To Verify account
authRouter.post('/verify-account', userAuth, mailVerification);

//To Check whether the account is authenticated or not 
authRouter.post('/is-auth', userAuth, isAuthenticated);

//To Send Reset Password
authRouter.post('/send-reset-otp', sendResetOtp);

//To Send Reset Password
authRouter.post('/reset-password', resetPassword);


export default authRouter