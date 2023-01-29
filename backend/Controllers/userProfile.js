const userModel = require("../models/userModel");
const axios = require("axios");
const formData = require("form-data");
const designerModel = require("../models/designerModel");
const partModel = require("../models/partModel");

const userProfile = async (req, res) => {
    console.log('jkhsdjhsad')
    try {
        if(!req.user) return res.status(404).json({message: "User Auth failed"})
        console.log("req.user ", req.user)
        res.status(200).send(req.user);
    } catch (error) {
        console.error(error);
    }
};

const updateFile = async (req, res) => {
    const file = req.files.file;
    const _id = req.user._id;
    console.log(req.files);
    const random = ("" + Math.random()).substring(2, 8);
    const fileName = random + "_" + file.name;
    try {
        const data = await userModel.findByIdAndUpdate(_id, {
            $set: {
                file: fileName,
            },
        });
        file.mv(`todo-list/public/images/${fileName}`, async (err) => {
            if (err) {
                console.error(err.message);
            }
        });
        res.status(200).send(data);
    } catch (error) {
        res.status(404).json({ message: "Image not uploaded." });
        console.error(error);
    }
};

const updateUserProfile = async (req, res) => {
    console.log(req.body);
    const {
        name,
        sur_name,
        country,
        company,
        func,
        state,
        zip,
        address,
        phone,
        email,
        verify_contact,
        roles,
        publicEmail,
        company_description,
        ingenieur,
        manufacturer,
        designer,
        projectTwo,
    } = req.body;
    _id = req.user._id;
    try {
        const user = await userModel.findByIdAndUpdate(_id, {
            $set: {
                name,
                sur_name,
                country,
                company,
                state,
                zip,
                address,
                phone,
                email,
                verify_contact,
                roles,
                publicEmail,
                company_description,
                func,
                ingenieur,
                manufacturer,
                designer,
                projectTwo,
            },
        });
        if (user) {
            res.status(200).send(user);
        }
    } catch (error) {
        res.status(200).json({ message: "Profile details are not updated" });
        console.error(error);
    }
};
let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoLWJhY2tlbmQ6YXBwIiwic3ViIjoiNzBiNzM0OTItOGY3OC00YWRjLWIyNjUtNzI2NWE2MWMwZjg3In0.ACF3yQWe4-EMrQNoLLCyEzeKTm6a613472FvP6cEpPg";

const generateSMS = async (req, res) => {
    console.log(req.body);
    // TOKEN
    let otps;
    var data = JSON.stringify({
        originator: "SignOTP",
        recipient: "+923089275988",
        content: "Greetings from EEVE, your mobile verification code is: {}",
        expiry: "600",
        data_coding: "text",
    });

    var config = {
        method: "post",
        url: "https://api.d7networks.com/verify/v1/otp/send-otp",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data: data,
    };

    axios(config)
        .then(function (response) {
            otps = JSON.stringify(response.data);
            console.log(JSON.stringify(response.data));
            console.log(otps);
            res.status(200).send(otps);
        })
        .catch(function (error) {
            console.log(error);
        });
};

let api_data;

// const verifyOTP = async(req, res) => {
//     const{company, state, city, zip, func, address, country} = req.body
//     console.log(company, state, city, zip, func, address, country)
//     try {
//         const result = await userModel.findByIdAndUpdate(
//             req.user._id,{
//                 $set: {company, state, city, zip, func, address, country}
//             }) 

//         console.log(result)
//         res.status(200).send(result)  
//     } catch (error) {
//         console.error(error)
//     }
// }

const verifyOTP = async (req, res) => {
    // console.log(req.body)
    const {
        // otp_id,
        // otp_code,
        company,
        state,
        city,
        zip,
        func,
        address,
        country,
    } = req.body;
    console.log(company, state, city, zip, func, address, country);
    // var data = JSON.stringify({
    //     "otp_id": otp_id,
    //     "otp_code": otp_code
    //   });

    //   var config = {
    //     method: 'post',
    //     url: 'https://api.d7networks.com/verify/v1/otp/verify-otp',
    //     headers: {
    //       'Authorization': `Bearer ${token}` ,
    //       'Content-Type': 'application/json'
    //     },
    //     data : data
    //   };

    //   axios(config)
    //   .then(async function (response) {
    //     api_data = JSON.stringify(response.data)
    try {
        const result = await userModel.findByIdAndUpdate(req.user._id, {
            $set: { company, state, city, zip, func, address, country },
        });

        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
    }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
}

const userLikes = async (req, res) => {
    try {
        if (req.user.func === "Designer") {
            const result = await designerModel.find({
                designer_id: req.user._id,
            });
            res.status(200).send(result);
        } else if (req.user.func === "Manufacturer") {
            const result = await partModel.find({ part_id: req.user._id });
            res.status(200).send(result);
        } else {
            res.status(200).send([]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).send(users);
    } catch (error) {
        console.error(error);
    }
};

const getAllUsersProfiles = async (req, res) => {
    try {
        const users = await userModel.find({ 
            email: { $ne: req.user.email },
            designer: "mainFolder",
            isApproved: true,
        });
        console.log(users)
        res.status(200).send(users);
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    userProfile,
    updateFile,
    updateUserProfile,
    generateSMS,
    verifyOTP,
    userLikes,
    getAllUsers,
    getAllUsersProfiles,
};
