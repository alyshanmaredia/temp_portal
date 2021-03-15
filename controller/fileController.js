const fs = require('fs');
const cloudinary = require('cloudinary')

cloudinary.config({
    api_key: process.env.CLOUDINARY_APIKEY,
    cloud_name: process.env.CLOUDINARY_ACC_NAME,
    api_secret: process.env.CLOUDINARY_SECRET
})

const clear = (tempFilePath) => {
    fs.unlink(tempFilePath, (error) => {
      if (error){
        throw error;
      } 
    });
  };

module.exports = fileController = {
    uploadImageFile: (req, res) => {
        try {
            const upload_file = req.files.file;
            
            cloudinary.v2.uploader.upload(upload_file.tempFilePath, {
                folder: 'profile_images'
            }, async(error, generatedURL) => {
                if(error){
                    throw error;
                }
                clear(upload_file.tempFilePath)
                res.json({cloud_url: generatedURL.secure_url})
            })
        
        } catch (error) {
            return res.status(500).json({err_msg: error.message})
        }
    }

}

