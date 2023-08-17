const express = require('express')
const Users = require('../models/Users')

const router = express.Router()

router.get('/', (req, res, next)=>{
    res.send('home')
})

router.post('/users/login', (req, res, next)=> {
    res.send('login')
})
router.post('/users/register', (req, res, next)=> {
    res.send('register')
})
router.put('/users/:id', (req, res, next)=>{
    res.send('사용자 정보 변경')
})
router.delete('/users/:id', (req, res, next)=> {
    res.send('사용자 데이터 삭제')
})

module.exports = router