const designerModel = require("../models/designerModel")
const partModel = require("../models/partModel")
const userModel = require("../models/userModel")

const approve_user = async(req, res) => {
    const _id = req.body.id
    if(!req.user) return res.status(404).json("User Authentication failed...")
    if(!req.user.isAdmin) return res.status(404).json("You Are not authorised...")
    try {
        const result = await userModel.findByIdAndUpdate({_id}, {
            isApproved: true
        })
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}

const add_user_jury = async(req, res) => {
    const _id = req.body.id
    try {
        const result = await userModel.findByIdAndUpdate({_id}, {
            isJury: true
        })
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}

const getAllDesignerImages = async(req, res) => {
    const _id = req.body.id
    try {
        const result = await designerModel.find();
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}

const approveDesignerImage = async(req, res) => {
    const _id = req.body.id
    try {
        const result = await designerModel.findByIdAndUpdate({_id}, {
            isApproved: true
        })
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}

const addInstaLikes = async(req, res) => {
    const _id = req.body.likesId
    try {
        const result = await designerModel.findByIdAndUpdate({_id}, {
            instaLikes: req.body.likes
        })
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}



const getAllManufacturersImages = async(req, res) => {
    try {
        const result = await partModel.find();
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}

const approveManufacturersImage = async(req, res) => {
    const _id = req.body.id
    try {
        const result = await partModel.findByIdAndUpdate({_id}, {
            isApproved: true
        })
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}

const addManufacturerInstaLikes = async(req, res) => {
    const _id = req.body.likesId
    try {
        const result = await partModel.findByIdAndUpdate({_id}, {
            instaLikes: req.body.likes
        })
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}

const getAllDesignerUsers = async(req, res) => {
    try {
        const result = await userModel.find({func: "Designer"});
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}

const getAllManufacturerUsers = async(req, res) => {
    try {
        const result = await userModel.find({func: "Manufacturer"});
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}

const addDesignerAdminImages = async(req, res) => {
    dLength = req.body.designer_imgs.length
    console.log(dLength)
    try {
        let result;
        for(var i=0; i<dLength; i++){
            const data = new designerModel({
                designer_id: req.body.designer_id,
                designer_name: "Administration",
                designer_imgs: req.body.designer_imgs[i],
                description: req.body.description,
                isApproved: true
            })
            result = await data.save();
        }
        res.status(200).send(result)
    } catch (error) {
        console.error(error)
    }
}

const addPartManuImages = async(req, res) => {
    dLength = req.body.part_imgs.length
    console.log(dLength)
    try {
        let result;
        for(var i=0; i<dLength; i++){
            const data = new partModel({
                part_id: req.body.part_id,
                part_name: "Administration",
                part_imgs: req.body.part_imgs[i],
                description: req.body.description,
                custom: req.body.custom,
                pices: req.body.pices,
                proposal: req.body.proposal,
                description: req.body.description,
                main_categ: req.body.main_categ,
                sec_categ: req.body.sec_categ,
                third_categ: req.body.third_categ,
                sub_categ: req.body.sub_categ,
                isApproved: true
            })
            result = await data.save();
        }
        res.status(200).send(result)
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    approve_user,
    add_user_jury,
    getAllDesignerImages,
    approveDesignerImage,
    addInstaLikes,
    getAllManufacturersImages,
    approveManufacturersImage,
    addManufacturerInstaLikes,
    getAllDesignerUsers,
    getAllManufacturerUsers,
    addDesignerAdminImages,
    addPartManuImages
}