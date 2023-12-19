const asyncHandler = require('express-async-handler')
const Pedido = require('../model/pedidosModel')

const getPedidos = asyncHandler( async (req, res) =>{
    const pedidos = await Pedido.find({user: req.user.id})
    res.status(200).json(pedidos)
})

const setPedidos = asyncHandler( async (req, res) => {
    if(!req.body){
        res.status(400)
        throw new Error({message: "Por favor ingrese algo"})
    }
    const pedido = await Pedido.create({
        pedido: req.body.pedido,
        productos: req.body.productos,
        user: req.user.id
    })
    res.status(201).json({pedido})
})

const updatePedidos = asyncHandler( async (req, res) => {
    const pedido= await Pedido.findById(req.params.id)
    if(!pedido){
        res.status(400)
        throw new Error('El pedido no fue encontrado')
    }
    if(pedido.user.toString() !==req.user.id){
        res.status(401)
        throw new Error("No autorizado")
    } else{
        const pedidoUpdated = await Pedido.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(pedidoUpdated)
    }
    
})


const deletePedidos = asyncHandler( async (req, res) => {
    const pedido= await Pedido.findById(req.params.id)
    if(!pedido){
        res.status(400)
        throw new Error('El producto no fue encontrado')
    }
    if(pedido.user.toString() !==req.user.id){
        res.status(401)
        throw new Error("No autorizado")
    } else{
        await Pedido.deleteOne(pedido)
    res.status(200).json({id: req.params.id})
    }
    
})

module.exports = {
    getPedidos,
    setPedidos,
    updatePedidos,
    deletePedidos
}