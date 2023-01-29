const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const userModel = require("../models/userModel")

const auth = async(req, res, next) => {
    try {
        const token = req.cookies.jwtoken
        const verUser = jwt.verify(token, process.env.SECRET_KEY)
        const user = await userModel.findOne({_id: verUser._id})
        
        req.token = token
        req.user = user
        if(!req.user) return res.status(404).json("User authentication failed")
        next()
    } catch (error) {
        res.status(401).json(error)
        console.log(error.message)
    }
}


module.exports = auth