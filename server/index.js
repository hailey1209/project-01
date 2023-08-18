const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan')
const mogoose = require('mongoose')
const axios = require('axios')
const usersRouter = require('../server/src/routes/users')
const moviesRouter = require('../server/src/routes/movies')
const homeRouter = require('../server/src/routes/home')
const config = require('../server/config')
const path = require('path')
const cookieParser = require('cookie-parser')

const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    credentials: true
}

mogoose.connect(config.MONGODB_URL)
.then(()=>console.log('Mongo DB connected...'))
.catch(e=>console.log(`failed to cennet Mongo DB: ${e}`))


app.use(cors(corsOptions))
app.use(express.json())
app.use(logger('tiny'))
//req.body에서 데이터를 받을 수 있게함
app.use(express.json({extended: false}))

app.use('/api/home', homeRouter)
app.use('/api/users', usersRouter)
app.use('/api/movies', moviesRouter)

app.get('/hello',  (req, res)=>{
    res.json('hello')
})
app.get('/error', (req, res)=> {
    throw new Error('Error has occured..!')
})

app.get('/fetch', async(req, res)=> {
    const response = await axios.get('http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=a686fcd94c3bc0a1ae44f56193240ed2&targetDt=20120101')
    res.json(response.data.boxOfficeResult.dailyBoxOfficeList)
})

app.use( (req, res, next)=> {
    res.status(404).send('Page not found')
})
app.use( (err, req, res, next)=> {
    console.error(err.stack)
    res.status(500).send('somthing has problem on server...')
})




app.listen(5000, ()=> {
    console.log('server is running on port 5000...')
})