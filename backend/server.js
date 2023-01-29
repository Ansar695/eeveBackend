require("dotenv").config();
const cookieParser = require("cookie-parser")
const express = require("express")
const path = require("path");
const cors = require("cors")
const bodyParser = require("body-parser")
const fileupload = require("express-fileupload")
// var timeout = require('connect-timeout')

const app = express()
const port = process.env.PORT || 5000

require("./DB/db")

// app.use(timeout('2s'))

app.use(
	cors({
		origin: /(eeveproject\.com$|localhost)/,
		credentials: true
	})
)
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Credentials', true);
//     next();
// });

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(fileupload())
app.use(cookieParser())
app.use(express.json())

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname, "../todo-list/build")))
    app.get("*", (req, res) => res.sendFile(path.join(__dirname, "../todo-list/build/index.html")))
}
app.use((req, res, next) => {
  if (!req.timedout) {
    next()
  }
})

app.use("/", require("./Routes/router"))

app.listen(port, () => console.log(`Server started at port no ${port}`))