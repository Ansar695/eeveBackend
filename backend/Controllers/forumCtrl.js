const forumModel = require("../models/forumModel");

const addArticleOrQuestion = async(req, res) => {
    const {question} = req.body;
    if(!question) return res.json({message: "Please send question first."})
    try {
        const result = new forumModel({
            ...req.body,
            userId: req.user._id
        })
        const data = await result.save()

        if(!data) return res.json({message: "Question not saved."})
        res.status(200).send(data)
    } catch (error) {
        console.error(error)
        res.status(404).send(error)
    }
}

const getAllArticleQuestions = async(req, res) => {
    try {
        const result = await forumModel.find({isApproved: true})

        if(!result || result.length===0) return res.json({message: "No Article Exists."})

        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
}

module.exports = {
    addArticleOrQuestion,
    getAllArticleQuestions
}