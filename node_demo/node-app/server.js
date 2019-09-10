const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const app = express()
const passport = require("passport")
// 引入users.js
const users = require("./routes/api/users")
const profiles = require("./routes/api/profiles")

// DB config
const db = require("./config/keys").mongoURI

// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// passport 初始化
app.use(passport.initialize())
require("./config/passport")(passport)

// Connect to mongodb
mongoose.connect(db)
.then(() => {
    console.log("MongodDb Connected")
})
.catch((err) => {
    console.log(err)
})


app.get("/", (req,res) => {
    res.send("Hello Word!")
})

// 使用routes
app.use("/api/users", users)
app.use("/api/profiles", profiles)

const port = process.env.PORT || 5000

app.listen(port,() => {
    console.log(`Server running on port ${port}`)
})