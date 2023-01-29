const express = require("express")
const { addDesignerImages, getAllDesignerImages, userImgComment, likeDesignerImage, getAll_Designers_Images, getAllDesignerImagesForDashboard, getCurrentUserUploadedImages } = require("../Controllers/designerController")
const { addPartImages, getAllPartImages, partImgComment, likePartImage, searchPartImages } = require("../Controllers/partController")
const { userProfile, updateUserProfile, updateFile, generateSMS, verifyOTP, userLikes, getAllUsers, getAllUsersProfiles } = require("../Controllers/userProfile")
const { userReg, userSignin, savedUserDesignerImage, savedUserPartImage, sendEmail } = require("../Controllers/userReg")
const router = express.Router()
const auth = require("../Middleware/auth")

const accountSid = "ACe366727b688610498b61f5487fb2660a"
const authToken = "02c86703b3da6664a91e44f1715ba3d7"
const client = require("twilio")(accountSid, authToken)
const { Auth } = require("two-step-auth");
const { approve_user, add_user_jury, approveDesignerImage, addInstaLikes, addManufacturerInstaLikes, approveManufacturersImage, getAllManufacturersImages, getAllDesignerUsers, getAllManufacturerUsers, addDesignerAdminImages, addPartManuImages } = require("../Controllers/DashboardCtrl")


var admin = require("firebase-admin");

var serviceAccount = require("../../serviceAccountKey.json");
const { addArticleOrQuestion, getAllArticleQuestions } = require("../Controllers/forumCtrl")
const { getSingleChat, createMessage, getOtherChatUser, getAllVIPUsersProfiles, moveToVip, removeFromVip } = require("../Controllers/chatCtrl")

const { addCadImages, getCadAllImages } = require("../Controllers/cadController")

const userModel = require('../models/userModel');
const counterModel = require('../models/counterModel');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// var serviceAccount = require("path/to/serviceAccountKey.json");

// USER REGISTRATION ROUTER
router.post("/signup", userReg)
router.post("/signin", userSignin)

router.post("/sendEmail", sendEmail)

// USER PROFILE ROUTER
router.get("/userProfile", auth, userProfile)
router.get("/userLikes", auth, userLikes)
router.post("/updateFile", auth, updateFile)
router.post("/updateUserProfile", auth, updateUserProfile)
router.post("/generateSMS", generateSMS)
router.post("/verifySMS", auth, verifyOTP)


// DESIGNER GALLERY
router.post("/addDesignerImages", auth, addDesignerImages)
router.get("/getAllDesignerImages", getAllDesignerImages)
router.get("/getAll_Designers_Images", auth, getAll_Designers_Images)
router.post("/savedUserDesignerImage", auth, savedUserDesignerImage)
router.post("/userImgComment", auth, userImgComment)
router.post("/likeDesignerImage", auth, likeDesignerImage)

router.get("/getCurrentUserUploadedImages", auth, getCurrentUserUploadedImages)

// PART GALLERY
router.post("/addPartImages", auth, addPartImages)
router.get("/getAllPartImages", getAllPartImages)
router.post("/savedUserPartImage", auth, savedUserPartImage)
router.post("/partImgComment", auth, partImgComment)
router.post("/likePartImage", auth, likePartImage)
router.post("/searchPartImages", searchPartImages)

// CAD GALLERY
router.post("/addCadImages", auth, addCadImages)
router.get("/getCadAllImages", getCadAllImages)
router.post("/savedUserPartImage", auth, savedUserPartImage)
router.post("/partImgComment", auth, partImgComment)
router.post("/likePartImage", auth, likePartImage)
router.post("/searchPartImages", searchPartImages)

//DASHOBOARD  GET ALL USERS
router.get("/getAllUsers", getAllUsers)
router.get("/getAllUsersProfiles", auth, getAllUsersProfiles)
router.post("/approve_user",auth, approve_user)
router.post("/add_user_jury", add_user_jury)
router.get("/getAllDesignerImages", getAllDesignerImages)
router.get("/getAllDesignerUsers", getAllDesignerUsers)
router.get("/getAllManufacturerUsers", getAllManufacturerUsers)
router.post("/approveDesignerImage", approveDesignerImage)
router.post("/addInstaLikes", addInstaLikes)
router.get("/getAllDesignerImagesForDashboard", auth, getAllDesignerImagesForDashboard)


router.get("/getAllManufacturersImages", getAllManufacturersImages)
router.post("/approveManufacturersImage", approveManufacturersImage)
router.post("/addManufacturerInstaLikes", addManufacturerInstaLikes)


router.post("/addDesignerAdminImages", addDesignerAdminImages)
router.post("/addPartManuImages", addPartManuImages)

router.post("/addArticleOrQuestion", auth, addArticleOrQuestion)
router.get("/getAllArticleQuestions", getAllArticleQuestions)


router.post("/getSingleChat", auth, getSingleChat)
router.post("/createMessage", auth, createMessage)
router.post("/getOtherChatUser", getOtherChatUser)
router.get("/getAllVIPUsersProfiles", auth, getAllVIPUsersProfiles)
router.post("/moveToVip", moveToVip)
router.post("/removeFromVip", removeFromVip)


// router.get("/verPhone", async(req, res) => {
//     const val = Math.floor(1000 + Math.random() * 9000);
//     client.messages
//     .create({
//         body: `Yout Otp verification code is <b>${val}</b>`,
//         from: '+19378883712',
//         to: '+923089275988'
//     })
//     .then(message => console.log(message.sid));
//     res.send("sended")
// })

// router.get("/verEmail", async(req, res) => {
//   try {
//     const resp = await Auth("ansarsaeed988@gmail.com");
//   // You can follow this approach,
//   // but the second approach is suggested,
//   // as the mails will be treated as important
//   const respo = await Auth("ansarsaeed988@gmail.com", "Company Name");
//   console.log(respo);
//   console.log(respo.mail);
//   console.log(respo.OTP);
//   console.log(respo.success);
//   res.send("Email sended "+respo)
//   } catch (error) {
//     console.error(error)
//   }
// })

router.get('/', async (req, res) => {
  const usersCount = await userModel.count();
  const callCount = await counterModel.increment();
  res.json({
    message: 'Welcome to eevebackend api',
    u_count: usersCount,
    c_count: callCount
  });
});

module.exports = router