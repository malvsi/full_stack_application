// @login & register
const express = require("express")
const router = express.Router()
const passport = require('passport')

const Profile = require("../../models/Profile")

// $router  GET api/profile/test
// @desc    返回的请求json数据
// @access  public
router.get("/test", (req,res) => {
  res.json({msg: "profile works!"})
})


module.exports = router