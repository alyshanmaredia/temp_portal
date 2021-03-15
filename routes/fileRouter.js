const express = require('express')
const fileRouter = express.Router();
const upload = require('../middlewares/imageFile')
const fileController = require('../controller/fileController')


fileRouter.post('/uploadImage', upload, fileController.uploadImageFile);

module.exports = fileRouter