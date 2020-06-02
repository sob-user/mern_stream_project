const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const auth = require('../../middleware/auth')
require('dotenv').config();

const userModel = require('../../models/userModel');

router.post('/contactAdmin/:id', auth, async(req, res) => {
    const object = req.body.object;
    const message = req.body.message
    if(!object) {
        return res.status(403).json({ msg: 'please add an object' });
    }
    if(!message) {
        return res.status(403).json({ msg: 'you need to add a message' })
    }
    try {
        const userAccount = await userModel.findById(req.params.id);
        if (!userAccount) throw Error('No user found');

        const mail = userAccount.email;

        const output = `
        <p>You have a new customer message from ${mail}</p>
        <h4>Message:</h4>
        <p>${message}</p>
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
            to: `${process.env.GMAIL_USER}`,
            subject: `${object}`,
            text: 'Hello World',
            html: output
        }

        let sendEmail = transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                return console.log(error);
            }
        });

        res.status(200).json({ msg: 'mail has sent' });
    }
    catch(e) {
        res.status(400).json({ error: e.message });
    }
});

module.exports = router;