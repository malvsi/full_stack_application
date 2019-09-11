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

// $router  POST api/profile/add
// @desc    返回的请求json数据
// @access  Private
router.post("/add",passport.authenticate("jwt",{session: false}), (req, res) => {
    /* const profileFields= {}

    if(req.body.type) profileFields.type = req.body.type
    if(req.body.income) profileFields.income = req.body.income
    if(req.body.describe) profileFields.describe = req.body.describe
    if(req.body.expend) profileFields.expend = req.body.expend
    if(req.body.cash) profileFields.cash = req.body.cash
    if(req.body.remark) profileFields.remark = req.body.remark


    new Profile(profileFields).save()
      .then(profile => {
        res.json(profile)
      })
      .catch(err =>{
        console.log(err)
      }) */

      res.json({
        msg: 'shish'
      })
})


module.exports = router