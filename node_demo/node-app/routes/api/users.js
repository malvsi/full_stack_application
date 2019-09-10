// @login & register
const express = require("express")
const router = express.Router()
const User = require("../../models/Users")
const bcrypt = require("bcrypt")  //密码加密
const gravatar = require("gravatar")    //头像
const jwt = require("jsonwebtoken")     //返回token
const keys = require("../../config/keys")
const passport = require('passport')

// $router  GET api/users/test
// @desc    返回的请求json数据
// @access  public
router.get("/test",(req, res) =>{
    res.json({
        msg: "login Works"
    })
})

// $router  POST api/users/regist
// @desc    返回的请求json数据
// @access  public
router.post("/regist", (req, res) => {
    // console.log(req.body)
    // 查询数据库中是否拥有邮箱
    User.findOne({email: req.body.email})
        .then((user) => {
            if(user) {
                return res.status(400).json({email: "邮箱已被占用"})
            } else {
                // 全球公认头像
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                })

                // 创建用户
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                })

                // 对密码加密
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err

                        newUser.password = hash

                        newUser.save()
                            .then(user => res.json(user))
                            .catch( err => console.log(err))
                    })
                })
            }
        })
})

// $router  POST api/users/login
// @desc    返回token jwt passport
// @access  public
router.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password

    // 查询数据库
    User.findOne({email})
        .then( user => {
            // 如果账户不存在
            if(!user) {
                return res.status(404).json({email: "用户不存在!"})
            }

            // 密码匹配
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        // 匹配成功需要做的事情
                        // jwt.sign("规则","加密名字","过期时间[秒]","箭头函数") 返回一个token

                        const rule = {id: user.id, name: user.name}     //规则
                        jwt.sign(rule,keys.secretOrKey,{expiresIn: 3600}, (err, token) => {
                            if(err) throw err
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            })
                        })
                        // res.json({msg: 'success'})
                    } else {
                        return res.status(404).json({password: "密码错误"})
                    }
                })
        })
})

// $router  GET api/users/current
// @desc    返回 current user
// @access  public
router.get("/current",passport.authenticate("jwt",{session: false}), (req, res) => {
    res.json(req.user)
})

module.exports = router