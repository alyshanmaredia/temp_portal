const webToken = require('jsonwebtoken')

const authentication = async (req,res,next) =>{
try {
    const accessToken = req.header("Authorization")
    if(!accessToken){
        return res.status(400).json({msg: "Authentication Failed."})
    }
    webToken.verify(accessToken, process.env.TOKEN_ACCESS, (err, agent) =>{
        if(err){
            return res.status(400).json({msg: "Authentication Failed."})
        }
        req.agent = agent
        next()
    })
} catch (err) {
    return res.status(500).json({msg: err.message})
}
}

module.exports = authentication