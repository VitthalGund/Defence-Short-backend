const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require("fs");
const multer = require("multer");
const User = require("../model/User");

// SET STORAGE
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name)
    }
})

let upload = multer({ storage: storage })

const uploadToDataBase = async (file, username, email) => {
    if (file && username && email) {
        console.table(file)
        let img = fs.readFileSync(file.path);
        let encode_img = img.toString('base64');
        // let final_img = {
        //     contentType: req.file.mimetype,
        //     image: new Buffer.alloc(req.file.size, encode_img, 'base64')
        // };
        const resp = await User.findOneAndUpdate({ username, email },
            { $set: { userProfileImage: new Buffer.alloc(file.size, encode_img, 'base64') } }).catch((erro) => {
                return erro
            })
        fs.unlinkSync(file.path);
        return { success: true, resp }
    }
    return { success: false }
}

router.put("/profileimage", upload.single('profilePic'), async (req, res) => {
    let data = await uploadToDataBase(req.file, req.body.username, req.body.email);
    if (data.success) {
        res.json(data.resp);
    } else {
        res.status(500).send("unable to upload the image");
    }
})


router.get("/:username", (req, res) => {
    User.find({ username: req.params.username }).then((resp) => {
        res.json({ resp });
    })
});

router.get("/image/:username", (req, res) => {
    User.findOne({ username: req.params.username }, { userProfileImage: 1, _id: 0 })
        .then((resp) => {
            res.json({ resp })
        });
});

router.put("/update", (req, res) => {
    res.json({ todo: "TODO", status: true })
});

module.exports = router;        