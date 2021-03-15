const fs = require('fs');

async function fileUpload(req,res,next) {
    try {
        
        const profilePic = req.files.file;
        
        if(Object.keys(req.files).length === 0 || !req.files){
            return res.status(400).json({err_msg: "There is no file uploaded!!"})
        }
        
        if(isLarger(profilePic))
        {    
            clear(profilePic.tempFilePath)
            return res.status(400).json({err_msg: "Cannot Upload file larger than 2mb"})
        }

        if(isType(profilePic))
        {
            clear(profilePic.tempFilePath)
            return res.status(400).json({err_msg: "This File Format is not Supported! upload only .jpeg .png files"})
        }
        
        next()
    } catch (error) {
        
        return res.status(500).json({err_msg: error.message})
    }  
}

function isLarger(imageFile){
    return imageFile.size > 2097152
}
function isType(imageFile){
    return (imageFile.mimetype !== 'image/jpeg' && imageFile.mimetype !== 'image/png' && imageFile.mimetype !== 'image/jpg')
}

const clear = (tempFilePath) => {
    fs.unlink(tempFilePath, (error) => {
      if (error){
          throw error
      }
    });
  };
  
module.exports = fileUpload;