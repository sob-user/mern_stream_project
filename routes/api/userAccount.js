const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../../middleware/auth');

require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET;

const userModel = require('../../models/userModel');


router.get('/getUserData', auth, async(req, res) => {
    try {
        const userAccount = await userModel.findById(req.user.id).select('-password');
        if(!userAccount) throw Error("user doesn't exist");

        res.status(200).json(userAccount);
    }
    catch(e) {
        res.status(400).json({ msg: e.message });
    }
});


router.get('/getUserFavoriteList/:id', auth, async(req, res) => {
    try {
        const userAccount = await userModel.findById(req.params.id).populate({ path: 'favorite_list' });
        if(!userAccount) throw Error("user doesn't exist");

        const favoriteList = userAccount.favorite_list

        function structureResponse(favoriteList) {
            const id = favoriteList.id;
            const author = favoriteList.author;
            const title = favoriteList.title;
            const parutionDate = favoriteList.parution_date;
            const musicalStyle = favoriteList.style;
            const audioFileName = favoriteList.audio[0].filename;
            const imageFilename = favoriteList.image[0].filename;

            const favoriteMusicItems = {
                id: id,
                title: title,
                author: author,
                parutionDate: parutionDate,
                style: musicalStyle,
                audioSource: `http://localhost:5000/media/${audioFileName}`,
                imageSource: `http://localhost:5000/media/${imageFilename}`
            }
            return favoriteMusicItems
        }
        const doThatForAllFavoriteMusicItems = favoriteList.map(structureResponse);

        res.status(200).json(doThatForAllFavoriteMusicItems)
    }
    catch(e) {
        res.status(400).json({ msg: e.message });
    }
});


router.post('/login', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        return res.status(400).json({ msg: 'please fill all fields' });
    }

    try {
        const userAccount = await userModel.findOne({ email });
        if(!userAccount) throw Error("user doen't exist");

        const verifyPaswword = await bcrypt.compare(password, userAccount.password);
        if(!verifyPaswword) throw Error('invalid credentials');

        const generateToken = jwt.sign({ id: userAccount._id }, jwt_secret, { expiresIn: "2h" });
        if(!generateToken) throw Error("couldn't sign the token");

        const token = generateToken;

            res.status(200).json({token});
    }
    catch(e) {
        res.status(400).json({ msg: e.message });
    }
});


router.post('/register', async(req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if(!username || !email || !password) {
        return res.status(400).json({ msg: 'please fill all fields' });
    }

    try {
        const userAlreadyExist = await userModel.findOne({ email });
        if(userAlreadyExist) throw Error('user already exist');

        const generateSalt = await bcrypt.genSalt(10);
        if(!generateSalt) throw Error('something went wrong with bcrypt');

        const hashPassword = await bcrypt.hash(password, generateSalt);
        if(!hashPassword) throw Error('something went wrong hashing password');

        const newUserAccount = new userModel({
            username,
            email,
            password: hashPassword
        });

        const savedNewUserAccount = newUserAccount.save();
        if(!savedNewUserAccount) throw Error('something went wrong saving the user');

        res.status(200).json({ msg: 'congratulation, now you are registered' });
    }
    catch(e) {
        res.status(400).json({ error: e.message });
    }
});


router.post('/addToFavoriteList/:id/:music_id', auth, async(req, res) => {
    try {
        const userId = req.params.id;
        const musicId = req.params.music_id;

        const userAccount = await userModel.findById(userId).populate({ path: 'favorite_list' });
        if(!userAccount) throw Error("user doesn't exist");

        const favoriteUserList = userAccount.favorite_list
        function ifAlreayExistInFavoriteList(favoriteUserList) {
            if(favoriteUserList._id == musicId) {
                throw Error('already add in your playlist');
            }
            return
        }
        const doThatForAllMusicItemsInFavoriteList = favoriteUserList.map(ifAlreayExistInFavoriteList);

        const addToFavoriteList = await userModel.findByIdAndUpdate(userId,
            { $push: { favorite_list: musicId } });
        if(!addToFavoriteList) throw Error('something went wrong trying to add favorite');

            res.status(200).json({ msg: 'add to playlist with success' });
    }
    catch(e) {
        res.status(400).json({ msg: e.message });
    }
});


router.post('/removedToFavoriteList/:id/:music_id', auth, async(req, res) => {
    try {
        const userId = req.params.id;
        const musicId = req.params.music_id;

        const deleteToFavoriteList = await userModel.findByIdAndUpdate(userId,
            {$pull: {favorite_list: musicId}});

        res.status(200).json({ msg: 'delete to playlist with success' })
    }
    catch(e) {
        res.status(400).json({ msg: e.message });
    }
});


router.put('/updateUsername/:id', auth, async(req, res) => {
    try {
        const username = req.body.username
        if(!username) throw Error('please fill an new username')

        const userId = req.params.id;
        const updateUsername = await userModel.findByIdAndUpdate(userId, req.body, {
            new: true, runValidators: true
        });
        if(!updateUsername) throw Error('something went wrong trying to change username')

        res.status(200).json({ msg: 'username was updated with success' });
    }
    catch(e) {
        res.status(400).json({ msg: e.message });
    }
});


router.put('/updateMailContact/:id', auth, async(req, res) => {
    try {
        const email = req.body.email
        if(!email) throw Error('please fill an new email')

        const userId = req.params.id;

        const ifMailAlreadyExist = await userModel.findOne({ email });
        if(ifMailAlreadyExist) throw Error('this address is already taken');

        const updateMailContact = await userModel.findByIdAndUpdate(userId, req.body, {
            new: true, runValidators: true
        });
        if(!updateMailContact) throw Error('something went wrong trying to change email contact');

        res.status(200).json({ msg: 'email was updated with success' });
    }
    catch(e) {
        res.status(400).json({ msg: e.message });
    }
});


router.put('/updatePwd/:id', auth, async(req, res) => {
    try {
        const userId = req.params.id;

        const currentPassword = req.body.currentPassword;
        if(!currentPassword) throw Error('fill your current password');

        const newPassword = req.body.password;
        if (!newPassword) throw Error('add new password');

        const userAccount = await userModel.findById(userId);
        if(!userAccount) throw Error("user doesn't exist");

        const verifyPaswword = await bcrypt.compare(currentPassword, userAccount.password);
        if(!verifyPaswword) throw Error('invalid credentials');

        const generateSalt = await bcrypt.genSalt(10);
        if(!generateSalt) throw Error('something went wrong with bcrypt');

        const hashPassword = await bcrypt.hash(newPassword, generateSalt);
        if(!hashPassword) throw Error('something went wrong hashing password');

        const updatePassword = await userModel.findByIdAndUpdate(userId, {password: hashPassword});
        if(!updatePassword) throw Error('something went wrong trying to change password');

        res.status(200).json({ msg: 'password was updated with success' });
    }
    catch(e) {
        res.status(400).json({ msg: e.message });
    }
});


router.delete('/deleteAccount/:id/:password', auth, async(req, res) => {
    const userId  = req.params.id
    try {
        const password = req.params.password;
        if(!password) throw Error('enter your password');

        const userAccount = await userModel.findById(userId);
        if(!userAccount) throw Error('no users found');

        const verifyPaswword = await bcrypt.compare(password, userAccount.password);
        if(!verifyPaswword) throw Error('invalid credentials');

        const deleteAccount = await userAccount.remove();
        if(!deleteAccount) throw Error('something went wrong while trying to delete account');

        res.status(200).json({ msg: 'account was deleted with success' });
    }
    catch(e) {
        res.status(400).json({ msg: e.message });
    }
});


module.exports = router;
