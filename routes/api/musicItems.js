const express = require('express');
const router = express.Router();
const fs = require('fs')
const auth = require('../../middleware/auth')
const setMediaFields = require('../../middleware/setMediaFields')


const itemModel = require('../../models/itemModel');
const userModel = require('../../models/userModel');


router.post('/addMusicItems/:id', setMediaFields, auth, async (req, res) => {

    const title = req.body.title;
    const author = req.body.author;
    const style =  req.body.style
    const parution_date = req.body.parution_date;
    const audio = req.files['audio'];
    const image = req.files['image'];

    if(!title) {
        return res.status(403).json({ msg: 'title is required' });
    }
    if(!author) {
        return res.status(403).json({ msg: 'name of author is required' });
    }
    if(!style) {
        return res.status(403).json({ msg: 'music style is required' });
    }
    if(!parution_date) {
        return res.status(403).json({ msg: 'parution date is required' });
    }
    if(!audio) {
        return res.status(403).json({ msg: 'please add audio file' });
    }
    if(!image) {
        return res.status(403).json({ msg: 'please add picture file' });
    }

    try{
        const userAccount = await userModel.findById(req.params.id);
        if(!userAccount) throw Error('no user found');

        const status = userAccount.status;
        if(!status) throw Error('user not reconized')
        if(status !== true) throw Error("you don't have right of access")

        const verify = userAccount.verify;
        if(!verify) throw Error('user not reconized')
        if(verify !== true) throw Error('your account is not verified')

        const newMusicItem = new itemModel({
            title,
            author,
            style,
            parution_date,
            audio,
            image
        });

        const savedMusicItem = await newMusicItem.save();
        if(!savedMusicItem) throw Error('something  went wrong saving the media');

        res.status(200).json({ msg: 'new music item add with success' });
    }
    catch(e){
        res.status(400).json({ error: e.message });
    }
});

router.get('/getMusicItems', auth, async (req, res) => {
    try {
        const musicItems = await itemModel.find();
        if(!musicItems) throw Error('no items')

        function structureResponse(musicItems) {
            const musicId = musicItems._id;
            const musicTitle = musicItems.title;
            const musicAuthor = musicItems.author;
            const musicParutionDate = musicItems.parution_date;
            const musicalStyle  = musicItems.style;
            const audioFilename  =  musicItems.audio[0].filename;
            const imageFilename = musicItems.image[0].filename;

            const musicItem = {
                id: musicId,
                title: musicTitle,
                author: musicAuthor,
                parutionDate: musicParutionDate,
                style: musicalStyle,
                audioSource: `http://51.91.251.172:5000/media/${audioFilename}`,
                imageSource: `http://51.91.251.172:5000/media/${imageFilename}`
            }
            return musicItem
        }
        const doThatForAllItems  = musicItems.map(structureResponse);

        res.status(200).json(doThatForAllItems);
    }
    catch(e) {
        res.status(400).json({ msg: e.message });
    }
});

router.delete('/deleteMusicItems/:id/:music_id', auth, async (req, res) => {
    try {
        const userAccount = await userModel.findById(req.params.id);
        if(!userAccount) throw Error('no user found');

        const status = userAccount.status;
        if(!status) throw Error('user not reconized')
        if(status !== true) throw Error("you don't have right of access")

        const verify = userAccount.verify;
        if(!verify) throw Error('user not reconized')
        if(verify !== true) throw Error('your account is not verified')

        const music = await itemModel.findById(req.params.music_id);
        if (!music) throw Error('no music found');

        const audioName = music.audio[0].filename;
        const imageName = music.image[0].filename;

        const deteteFromDatabase = await music.remove();
        if (!deteteFromDatabase)
        throw Error('something went wrong while trying to delete mucic from database');

        fs.unlinkSync(`./public/media/${audioName}`);
        fs.unlinkSync(`./public/media/${imageName}`);
        res.status(200).json({ msg: 'music item data was deleted with success' });
        } 
        catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

module.exports = router;