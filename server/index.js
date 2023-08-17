const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan')
const mogoose = require('mongoose')
const axios = require('axios')
const usersRouter = require('../server/src/routes/users')
const moviesRouter = require('../server/src/routes/movies')

const CONNECT_URL = 'mongodb://127.0.0.1:27017/hailey'
mogoose.connect(CONNECT_URL)
.then(()=>console.log('Mongo DB connected...'))
.catch(e=>console.log(`failed to cennet Mongo Db: ${e}`))

const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    credentials: true
}

app.use(logger('tiny'))

app.use(cors(corsOptions))

app.get('/hello',  (req, res)=>{
    res.json('hello')
})
app.get('/error', (req, res)=> {
    throw new Error('Error has occured..!')
})
// app.get('/fetch', async(req, res)=> {
//     const response = await axios.get('http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=a686fcd94c3bc0a1ae44f56193240ed2&targetDt=20120101')
//     res.json(response.data.boxOfficeResult.dailyBoxOfficeList)
// })

app.use( (req, res, next)=> {
    res.status(404).send('Page not found')
})
app.use( (err, req, res, next)=> {
    console.error(err.stack)
    res.status(500).send('somthing has problem on server...')
})

app.use('/api/users', usersRouter)
app.use('/api/movies', moviesRouter)


app.listen(5000, ()=> {
    console.log('server is running on port 5000...')
})