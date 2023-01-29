const designerModel = require("../models/designerModel")
const fs = require("fs")
const partModel = require("../models/partModel")
const cadModel = require("../models/cadModel")

const addDesignerImages = async(req, res) => {
    dLength = req.body.designer_imgs.length
    if(!req.body) return res.status(400).json("images are not uploaded, please try again.")

    try {
        let result;
        for(var i=0; i<dLength; i++){
            const data = new designerModel({
                designer_id: req.user._id,
                designer_name: req.user.name,
                designer_imgs: req.body.designer_imgs[i],
                description: req.body.description
            })
            result = await data.save();
        }
        
        if(!result) return res.status(400).json("Error occured during upload, try again.")
        res.status(200).send(result)
    } catch (error) {
        console.error(error)
    }
}

const getAllDesignerImages = async(req, res) => {
    try {
        const result = await designerModel.find({isApproved: true})
        res.status(200).send(result)
    } catch (error) {
        res.status(400).json(error.message)
        console.error(error)
    }
}

const getAllDesignerImagesForDashboard = async(req, res) => {
    try {
        const result = await designerModel.find()
        res.status(200).send(result)
    } catch (error) {
        res.status(400).json(error.message)
        console.error(error)
    }
}

const getAll_Designers_Images = async(req, res) => {
    try {
        console.log(req.user._id)
        const result = await designerModel.find({_id: req.user._id})
        res.status(200).send(result)
    } catch (error) {
        res.status(400).json(error.message)
        console.error(error)
    }
}

const getCurrentUserUploadedImages = async(req, res) => {
    try {
        let result;
        if(req.user.func==="Designer"){
            result = await designerModel.find({designer_id: req.user._id})
            console.log("designer")
            res.status(200).send(result)
            return
        }
        if(req.user.func === "Manufacturer"){
            result = await partModel.find({part_id: req.user._id})
            res.status(200).send(result)
            console.log("manufacturer")
            return
        }
        if(req.user.func==="Technical draftsman/engineer"){
            result = await cadModel.find({cad_id: req.user._id})
            console.log("cadder", req.user._id)
            res.status(200).send(result)
            return
        }
    } catch (error) {
        console.error(error)
        res.status(404).json({message: error.message})
    }
}

const userImgComment = async(req, res) => {
    console.log(req.body)
    const{_id, comment} = req.body
    const{name, sur_name, file} = req.user
    console.log(file)
    const user_name = name+" "+sur_name
    try {
        const result = await designerModel.findOne({_id})
        if(!result){
            res.status(404).json({message: "Image Not Found"})
            return
        }
        const comments = await result.UserImageComments(file, req.user._id, user_name, comment)

        res.status(200).send(result)
    } catch (error) {
        res.status(400).json(error.message)
        console.error(error)
    }
}

const likeDesignerImage = async(req, res) => {
    console.log(req.body)
    const user_id = req.user._id
    console.log(user_id)
    const{_id} = req.body
    try {
        if(req.body.liked==="false"){
            const result = await designerModel.updateOne({_id}, {
                com_likes: {
                    $elemMatch: {
                        user_id: "",
                    }
                }
            })
            res.status(200).send(result)
            return
        }
        const result = await designerModel.findOne({_id})
        if(!result){
            res.status(404).json({message: "Image Not Found"})
            return
        }
        const likes = await result.UserDesignerImageLikes(req.user._id)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).json(error.message)
        console.error(error)
    }
}

module.exports = {
    addDesignerImages,
    getAllDesignerImages,
    userImgComment,
    likeDesignerImage,
    getAll_Designers_Images,
    getAllDesignerImagesForDashboard,
    getCurrentUserUploadedImages
}