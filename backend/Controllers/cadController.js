const cadModel = require("../models/cadModel")

const addCadImages = async(req, res) => {
    dLength = req.body.cad_imgs.length
    console.log(dLength)
    try {
        let result;
        for(var i=0; i<dLength; i++){
            const data = new cadModel({
                cad_id: req.user._id,
                cad_name: req.user.name+" "+req.user.sur_name,
                cad_imgs: req.body.cad_imgs[i],
                description: req.body.description,
                custom: req.body.custom,
                pices: req.body.pices,
                proposal: req.body.proposal,
                description: req.body.description,
                main_categ: req.body.main_categ,
                sec_categ: req.body.sec_categ,
                third_categ: req.body.third_categ,
                sub_categ: req.body.sub_categ,
            })
            result = await data.save();
        }
        res.status(200).send(result)
    } catch (error) {
        console.error(error)
    }
}

const getCadAllImages = async(req, res) => {
    console.log("Cad test")
    try {
        const result = await cadModel.find({isApproved: true})
        res.status(200).send(result)
    } catch (error) {
        res.status(400).json(error.message)
        console.error(error)
    }
}

const searchCadImages = async(req, res) => {
    console.log(req.body.val)
    try {
        const result = await partModel.find({part_name: {$regex: req.body.val}})
        res.status(200).send(result)
    } catch (error) {
        res.status(400).json(error.message)
        console.error(error)
    }
}

const cadImgComment = async(req, res) => {
    console.log(req.body)
    const{_id, comment} = req.body
    const{name, sur_name, file} = req.user
    console.log(file)
    const user_name = name+" "+sur_name
    try {
        const result = await partModel.findOne({_id})
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

const likeCadImage = async(req, res) => {
    console.log(req.body)
    const{_id} = req.body

    try {
        const result = await partModel.findOne({_id})
        if(!result){
            res.status(404).json({message: "Image Not Found"})
            return
        }
        const likes = await result.UserImageLikes(req.user._id)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).json(error.message)
        console.error(error)
    }
}

module.exports = {
    addCadImages,
    getCadAllImages,
    cadImgComment,
    likeCadImage,
    searchCadImages
}