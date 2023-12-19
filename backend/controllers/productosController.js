const asyncHandler = require('express-async-handler')
const Producto = require('../model/productosModel')

const getProductos = asyncHandler( async (req, res) =>{
    const productos = await Producto.find({user: req.user.id})
    res.status(200).json(productos)
})

const setProductos = asyncHandler( async (req, res) => {
    if(!req.body.producto){
        res.status(400)
        throw new Error({message: "Por favor ingrese algo"})
    }
    const producto = await Producto.create({
        producto: req.body.producto,
        user: req.user.id
    })
    res.status(201).json({producto})
})

const updateProductos = asyncHandler( async (req, res) => {
    const producto= await Producto.findById(req.params.id)
    if(!producto){
        res.status(400)
        throw new Error('El producto no fue encontrado')
    }
    if(producto.user.toString() !==req.user.id){
        res.status(401)
        throw new Error("No autorizado")
    } else{
        const productoUpdated = await Producto.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(productoUpdated)
    }

    
})

const deleteProductos = asyncHandler( async (req, res) => {
    const producto= await Producto.findById(req.params.id)
    if(!producto){
        res.status(400)
        throw new Error('El producto no fue encontrado')
    }
    if(producto.user.toString() !==req.user.id){
        res.status(401)
        throw new Error("No autorizado")
    } else{
        await Producto.deleteOne(producto)
    res.status(200).json({id: req.params.id})
    }
    
})

module.exports = {
    getProductos,
    setProductos,
    updateProductos,
    deleteProductos
}