const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const registrarUser = asyncHandler( async (req, res) =>{
    const{name,email,password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Faltan datos')
    }

    const userExiste = await User.findOne({email})
    if(userExiste){
        res.status(400)
        throw new Error ("Ya esiste ese usuario con ese email, favor de verificar")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            admin: user.esAdmin
        })
    } else{
        res.status(400)
        throw new Error("Error al crear el usuario")
    }
    
})

const loginUser = asyncHandler( async (req, res) =>{

    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generarToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Credenciales incorrectas')
    }
})

const misDatos = asyncHandler( async (req, res) =>{
    res.status(200).json(req.user)
})

const generarToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '3h'
    })
}

module.exports = {
    registrarUser,
    loginUser,
    misDatos
}