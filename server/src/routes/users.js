const express = require('express')
const User = require('../models/Users')
const ex_async_handler = require('express-async-handler')
const { generateToken, isAuth } = require('../../auth')

const router = express.Router()

// 회원가입
router.post('/register', ex_async_handler( async (req, res, next) => {
    console.log(req.body)
    const { name, email, password, userId } = req.body
    try{
        let user = await User.findOne({email: req.body.email})
        if(user){
            return res.status(400).json({code: 400, message: '이미 사용중인 이메일 입니다.'})
        }else{
            user = new User({
                name: req.body.name,
                email: req.body.email,
                userId: req.body.userId,
                password: req.body.password,
            })
            
            await user.save()
            // res.send('Success')
            res.json({
                code: 200,
                token: generateToken(user)
            })
        }
    } catch (error){
        console.error(error.message)
        res.status(500).send('server error')
    }
    // res.redirect(__dirname, '/index.html')
}))

// 로그인
router.post('/login', ex_async_handler( async (req, res, next)=> {
   console.log(req.body)
   const login_user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
   })
   if(!login_user){
    res.status(401).json({code: 401, message: '이메일 또는 비밀번호가 유효하지 않습니다.'})
   }else{
    const { name, email, userId, isAdmin, created_on } = login_user
    res.json({
        code: 200,
        token: generateToken(login_user),
        name, email, userId, isAdmin, created_on
    })
   }
}))

// 사용자 정보 변경
router.put('/:id', isAuth,ex_async_handler( async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(404).json({code: 404, message: '로그인 후 사용해주세요'})
    }else{
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.password = req.body.password || user.password
        user.isAdmin = req.body.isAdmin || user.isAdmin

        const updated_user = await user.save()
        const { name, email, userId, isAdmin, created_on, last_update } = updated_user
        res.json({
            code: 200,
            token: generateToken(updated_user),
            name, email, userId, isAdmin, created_on, last_update
        })
    }
}))

// 사용자 데이터 삭제
router.delete('/:id',isAuth, ex_async_handler( async (req, res, next)=> {
    const user = await User.findOneAndDelete(req.params.id)
    if(!user){
        res.status(404).json({code: 404, message: '사용자를 찾을 수 없습니다.'})
    }else{
        res.status(204).json({code: 204, message: '탈퇴가 완료 되었습니다.'})
    }
}))

module.exports = router