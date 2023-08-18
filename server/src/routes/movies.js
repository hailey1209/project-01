const express = require('express')
const Movies = require('../models/Movies')
const ex_async_handler = require('express-async-handler')
const { isAuth } = require('../../auth')

const router = express.Router()

//영화 전체 목록
router.get('/movies', (req, res, next)=>{
    res.json('movies')
})

//사용자 영화 리스트
router.get('/movies/:id', (req, res, next)=> {
    res.json('사용자 영화 리스트')
})

//사용자 영화 리스트 추가
router.post('/movies/:id', (req, res, next)=> {
    res.json('사용자 영화 목록 추가')
})

//사용자 영화 리스트 삭제
router.delete('/movies/:id', (req, res, next)=> {
    res.json('사용자 영화 목록 아이템 삭제')
})

module.exports = router