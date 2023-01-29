const chatModel = require("../models/chatModel")
const userModel = require("../models/userModel")

const getSingleChat = async(req, res) => {
    try {
        const result = await chatModel.findOne({
            $and: [
                {
                    $or: [{userSec_id: req.body._id}, {userSec_id: req.user._id}],
                },
                {
                    $or: [{currUser_id: req.body._id}, {currUser_id: req.user._id}]
                }
            ]
        })
        if(result){
            console.log(result)
            res.status(200).send(result)
        }else{
            const resultData = new chatModel({
                userSec_id: req.body._id,
                currUser_id: req.user._id,  
            })
            const data = await resultData.save();
            res.status(200).send(data)
        }
    } catch (error) {
        console.error(error)
    }
}

const createMessage = async(req, res) => {
    console.log(req.body)
    try {
        const findUsers = await chatModel.findOne({
            $and: [
                {
                    $or: [{userSec_id: req.body.secId}, {userSec_id: req.user._id}],
                },
                {
                    $or: [{currUser_id: req.body.secId}, {currUser_id: req.user._id}]
                }
            ]
        })
        console.log(findUsers)
        if(findUsers){
            const result = await findUsers.generateMessage(req.user._id, req.body.message)
            res.status(200).send(result)
        }
    } catch (error) {
        console.error(error)
    }
}

const getOtherChatUser = async(req, res) => {
    const _id = req.body._id
    console.log(_id)
    console.log(req.query, req.param)
    try {
        const findUser = await userModel.findOne({_id})
        res.status(200).send(findUser)
    } catch (error) {
        console.error(error)
    }
}

const getAllVIPUsersProfiles = async(req, res) => {
    try {
        if(!req.user) return res.json({message: "User Auhentication failed"})
        const findUser = await userModel.find({
            designer: "vipFolder", 
            email: { $ne: req.user.email },
            isApproved: true,
        })
        res.status(200).send(findUser)
    } catch (error) {
        console.error(error)
    }
}

const moveToVip = async(req, res) => {
    const _id = req.body._id
    console.log(_id)
    try {
        const findUser = await userModel.findByIdAndUpdate({_id},{designer: "vipFolder"})
        res.status(200).send(findUser)
    } catch (error) {
        console.error(error)
    }
}

const removeFromVip = async(req, res) => {
    const _id = req.body._id
    console.log(_id)
    try {
        const findUser = await userModel.findByIdAndUpdate({_id},{designer: "mainFolder"})
        res.status(200).send(findUser)
    } catch (error) {
        console.error(error)
    }
}


module.exports = {
    getSingleChat,
    createMessage,
    getOtherChatUser,
    getAllVIPUsersProfiles,
    moveToVip,
    removeFromVip
}