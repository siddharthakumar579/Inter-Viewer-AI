const jwt = require('jsonwebtoken')
const blacklistTokenModel = require('../models/blackList.Token')

async function authuser (req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "No token found"
        })
    }

    try{
        const isTokenBlacklisted = await blacklistTokenModel.findOne({token});

        if (isTokenBlacklisted) {
            return res.status(401).json({
                message: "Invalid Token"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded
        next()  

    } catch (err) {
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
    
}

module.exports = {authuser}