const Agents = require('../model/agentSchema')

const adminAuthentication = async (req,res,next) =>{
    try {
        const agent = await Agents.findOne({_id: req.agent.id})
        if(agent.isAdmin == false){
            return res.status(500).json({msg: "Not Admin"})
        }
        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = adminAuthentication;