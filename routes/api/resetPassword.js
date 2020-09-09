const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');


require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET;

const userModel = require('../../models/userModel');

router.get('/:token', async(req, res) => {
    try {
        const verifyToken = jwt.verify(req.params.token, jwt_secret);

        res.render('reset');
        res.set({
            'user': `${req.params.token}`
        })
    }
    catch(e) {
        res.status(400).json({ msg: e.message });
    }
})

router.post('/', async(req, res) => {
    try {
        console.log(req.body)
        const username = req.body.username;
        if(!username) throw Error('please fill an username');

        const email = req.body.email;
        if(!email) throw Error('please fill an email');

        const userAccount = await userModel.findOne({email});
        if(!userAccount) throw Error("this account doesn't exist");

        const verifyUsername = userAccount.username;
        if(username !== verifyUsername) throw Error('no correspondence with account')

        const generateToken = jwt.sign({ email: email }, jwt_secret, { expiresIn: "1h" });
        if(!generateToken) throw Error("couldn't sign the token");

        const output = `
        <h4>Dear ${userAccount.username},<h4>
        <p>To reset your password please click on the following 
        link and follow the instructions:</p>
        <a href='http://51.91.251.172:5000/api/reset/${generateToken}'>click here</a>
        `;

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.USER_PASS
            }
        });

        let mailOptions = {
            from: `"Older Customer" <${process.env.GMAIL_USER}>`,
            to: `${userAccount.email}`,
            subject: 'account reset',
            text: 'Hello World',
            html: output
        }

        let sendEmail = transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                return console.log(error);
            }
        });

        res.status(200).json({ msg: 'reset mail has sent' });
    }
    catch(e) {
        res.status(400).json({ msg: e.message });
    }
})

router.put('/:token', async(req, res) => {
    try {
        const newPassword = req.body.newPassword;
        if(!newPassword) throw Error('please fill an new password');

        const verifyToken = jwt.verify(req.params.token, jwt_secret);

        const email = verifyToken.email;
        if(!email) throw Error('something went wrong with email');

        const userAccount = await userModel.findOne({email});
        if(!userAccount) throw Error("this account doesn't exist");

        const generateSalt = await bcrypt.genSalt(10);
        if(!generateSalt) throw Error('something went wrong with bcrypt');

        const hashPassword = await bcrypt.hash(newPassword, generateSalt);
        if(!hashPassword) throw Error('something went wrong hashing password');

        const updatePassword = await userModel.findByIdAndUpdate(userAccount._id, {password: hashPassword});
        if(!updatePassword) throw Error('something went wrong trying to change password');

        res.status(200).json({ msg: 'password changed with success' });
    }
    catch(e) {
        res.status(400).json({ msg: e.message });
    }
})


module.exports = router;
