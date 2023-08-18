const config = require('../server/config')
const jwt = require('jsonwebtoken')

const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        userId: user.userId,
        isAdmin: user.isAdmin,
        created_on: user.created_on,
    },
    config.JWT_SECRET,
    {
        expiresIn: '1d',
        issuer: 'hailey'
    }
    )
}

const isAuth = (req, res, next) => {
    const bearerToken = req.headers.authorization
    if(!bearerToken){
        res.status(401).json({message: '토큰이 유효하지 않습니다.'})
    }else{
        const token = bearerToken.slice(7, bearerToken.length)
        jwt.verify(token, config.JWT_SECRET, (err, userInfo) => {
            if(err && err.name === 'TokenExpiredError'){
                res.status(419).json({code: 419, message: '토큰이 만료되었습니다.'})
            }else if(err){
                res.status(401).json({code: 401, message: '토큰이 유효하지 않습니다.'})
            }
            req.user = userInfo
            next()
        })
    }
}

const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401).json({code: 401, message: '권한이 없습니다.'})
    }
}

module.exports = {
    generateToken,
    isAuth,
    isAdmin
}