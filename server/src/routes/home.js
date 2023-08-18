const express = require('express')
const ex_async_handler = require('express-async-handler')

const router = express.Router()

router.get('/', ex_async_handler( async (req, res, next)=> {
   await res.sendFile(__dirname + '/index.html')
}))

module.exports = router
