const express = require('express')
const Movies = require('../models/Movies')

const router = express.Router()

router.get('/movies', (req, res, next)=>{
    res.send('movies')
})

router.get('/movies/:id', (req, res, next)=> {
    res.send('사용자 영화 리스트')
})
router.post('/movies/:id', (req, res, next)=> {
    res.send('사용자 영화 목록 추가')
})
router.delete('/movies/:id', (req, res, next)=> {
    res.send('사용자 영화 목록 아이템 삭제')
})

module.exports = router