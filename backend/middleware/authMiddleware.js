const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const protect = asyncHandler(async(req, res, next) =>{
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error){
            console.log(error);
            res.status(401).json({message: "Not authorized to access this route"})
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Acceso no autorizado')
    }
                
})

module.exports = {protect}