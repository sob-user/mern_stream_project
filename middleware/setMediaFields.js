const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './public/media',
    filename: function(res, file, cb) {
        cb(null, file.fieldname  + '_' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
});

function checkFileType(file, cb) {
    const filetypes = /png||mp3/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname) {
        return cb(null, true);
    }
    else {
        cb('error: this extension file is not accepted');
    }
}

const setMediaFields = upload.fields([
    { name: 'audio'},
    { name: 'image' }
]);

module.exports = setMediaFields;