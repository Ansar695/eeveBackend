const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const cadSchema = new mongoose.Schema({
    img_title: {
        type: String,
        default: ""
    },
    cad_id: {
        type: String,
        required: true
    },
    cad_name: {
        type: String,
        required: true,
    },
    cad_imgs: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: ""
    },
    custom: {
        type: String,
        default: ""
    },
    pices: {
        type: String,
        default: ""
    },
    proposal: {
        type: String,
        default: ""
    },
    production: {
        type: String,
        default: ""
    },
    main_categ: {
        type: String,
        default: ""
    },
    sec_categ: {
        type: String,
        default: ""
    },
    third_categ: {
        type: String,
        default: ""
    },
    sub_categ: {
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
    likes: [{
        user_id: String,
    }]
},
{
    timestamps: true
})

cadSchema.methods.UserImageComments = async function(file, _id, user_name, comment){
    try {
        this.comments = this.comments.concat({user_img:file, user_id:_id, user_name, comment})
        await this.save()
        return this
    } catch (error) {
        console.log(error)
    }
}

cadSchema.methods.UserImageLikes = async function(user_id){
    try {
        this.likes = this.likes.concat({user_id})
        await this.save()
        return this
    } catch (error) {
        console.log(error)
    }
}

const cadModel = new mongoose.model("cad_img", cadSchema)

module.exports = cadModel