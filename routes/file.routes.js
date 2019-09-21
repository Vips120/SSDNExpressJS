let express = require('express');
let router = express.Router();
let F = require('../mongodb/userRegistration');
let multer = require('multer');

let imgPort = 'http://localhost:4000';
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

let upload = multer({
    storage: storage,
     limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


router.post('/file', upload.single('image'), async(req,res) => {
let file = new F.File({
    image: imgPort + '/uploads/' + req.file.filename
});

if(!file) {return res.status(402).send('Something went wrong')}
let data = await file.save();
res.send(data);
});

router.get('/:id', async(req,res) => {
    let file = await F.File
                       .findById(req.params.id)
                        .select("-_id")
                       ;
      if(!file) {return res.status(402).send('invalid id')}
      res.send(file);
});

module.exports = router;