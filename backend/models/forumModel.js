const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const forumSchema = new mongoose.Schema({
    userId: String,
    question: String,
    isApproved: {type: Boolean, default: false},
    comments: [{
        user_id: String,
        repliedTo: String,
        comment: {
            type: String,
            required: true
        }
    }]
},
{
    timestamps: true
})

// partSchema.methods.UserImageLikes = async function(user_id){
//     try {
//         this.likes = this.likes.concat({user_id})
//         await this.save()
//         return this
//     } catch (error) {
//         console.log(error)
//     }
// }

const forumModel = new mongoose.model("forum", forumSchema)

module.exports = forumModel