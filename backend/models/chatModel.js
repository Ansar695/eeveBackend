const mongoose = require("mongoose")

const chatSchema = mongoose.Schema({
    userSec_id: String,
    userSec_name: String,
    currUser_id: String,
    currUser_name: String,
    messages: [{
        user_id: String,
        message: String,
        created_at: {
            type: Date,
            default: Date.now()
        }
    }]
})

chatSchema.methods.generateMessage = async function(user_id, message){
    try {
        this.messages = this.messages.concat({user_id,message})
        await this.save()
        return this
    } catch (error) {
        console.log(error)
    }
}

const chatModel = mongoose.model("chat", chatSchema)

module.exports = chatModel