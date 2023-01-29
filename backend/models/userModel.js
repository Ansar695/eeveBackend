const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        default: ""
    },
    isAdmin: {type: Boolean, default: false},
    isEmailVerified: {type: Boolean, default: false},
    name: {
        type: String,
        required: true,
    },
    sur_name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        required: true,
        min: 4,
        max: 20
    },
    company: {
        type: String,
        default: "",
    },
    country: {
        type: String,
        
    },
    state: {
        type: String,
        default: "",
    },
    zip: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    phone: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    file: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    verify_contact: {
        type: String,
        default: ""
    },
    verify: {
        type: String,
        default: "no"
    },
    roles: {
        type: String,
        default: ""
    },
    publicEmail: {
        type: String,
        default: ""
    },
    company_description:{
        type: String,
        default: ""
    },
    ingenieur: {
        type: String,
        default: "mainFolder"
    },
    manufacturer: {
        type: String,
        default: "mainFolder"
    },
    designer: {
        type: String,
        default: "mainFolder"
    },
    projectTwo: {
        type: String,
        default: "mainFolder"
    },
    func:{
        type: String,
        default: ""
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    isJury: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String
        }
    }],
    saved: [{
        d_image: {
            type: String
        },
        description: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
        userId: String,
    }]
},
{
    timestamps: true
})


userSchema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id: this._id}, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token: token})
        await this.save()
        return token
    } catch (error) {
        console.log(error)
    }
}

userSchema.methods.saveSignleDesignerImage = async function(d_image, description, title){
    try {
        this.saved = this.saved.concat({d_image, description, title, userId:req.user._id})
        await this.save()
        return this
    } catch (error) {
        console.log(error)
    }
}

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

const userModel = new mongoose.model("users", userSchema)

module.exports = userModel