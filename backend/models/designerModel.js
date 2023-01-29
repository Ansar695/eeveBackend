const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const designerSchema = new mongoose.Schema({
    img_title: {
        type: String,
        default: ""
    },
    designer_id: {
        type: String,
        required: true
    },
    designer_name: {
        type: String,
        required: true,
    },
    designer_imgs: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        default: ""
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    instaLikes: {
        type: String,
        default: "0"
    },
    comments: [{
        user_img: String,
        user_id: String,
        user_name: {
            type: String, 
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }],
    com_likes: [{
        user_id: String
    }],
    jury_likes: [{
        user_id: String
    }],
    insta_likes: [{
        user_id: String
    }]
},
{
    timestamps: true
})

designerSchema.methods.UserImageComments = async function(file, _id, user_name, comment){
    try {
        this.comments = this.comments.concat({user_img:file, user_id:_id, user_name, comment})
        await this.save()
        return this
    } catch (error) {
        console.log(error)
    }
}

designerSchema.methods.UserDesignerImageLikes = async function(user_id){
    try {
        this.com_likes = this.com_likes.concat({user_id})
        await this.save()
        return this
    } catch (error) {
        console.log(error)
    }
}

const designerModel = new mongoose.model("designer_img", designerSchema)

module.exports = designerModel