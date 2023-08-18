const express = require('express')
const Movies = require('../models/Movies')
const ex_async_handler = require('express-async-handler')
const { isAuth } = require('../../auth')
const axios = require('axios')
const { json } = require('express')

const router = express.Router()

//영화 
router.get('/', ex_async_handler( async (req, res, next)=> {
    const movies = await Movies.find({})
    if(!movies){
        res.status(404).json({code: 404, message: 'not found'})
    }else{
        res.json({
            code: 200, 
            movies
        })
    }
}))

//사용자 영화 리스트
router.get('/:id', (req, res, next)=> {
    res.json('사용자 영화 리스트')
})

//사용자 영화 리스트 추가
router.post('/:id', isAuth, ex_async_handler( async (req, res, next)=> {
    const searched_movie = await Movies.findOne({
        title: req.body.title
    })
    if(searched_movie){
        res.status(204).json({code: 204, message: '추가하려는 영화가 이미 존재 합니다.'})
    }else{
        const movie = new Movie({
            title: req.body.title,
            genre: req.body.genre,
            overview: req.body.overview, 
            poster_img: req.body.poster_img,
            relrease_date: req.body.relrease_date,
            video: req.body.video,
        })

        const newMovie = await movie.save()
        if(!newMovie){
            res.status(401).json({code: 401, message: '아이템이 추가 되지않았습니다.'})
        }else{
            res.status(201).json({
                code: 201, 
                message: '아이템이 추가 되었습니다.',
                newMovie})
        }
    }
}))

//사용자 영화 리스트 삭제
router.delete('/:id', (req, res, next)=> {
    res.json('사용자 영화 목록 아이템 삭제')
})

module.exports = router