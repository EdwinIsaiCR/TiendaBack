const express = require('express')
const router = express.Router()
const {getProductos, setProductos, updateProductos, deleteProductos} = require('../controllers/productosController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getProductos).post(protect, setProductos)
router.route('/:id').put(protect, updateProductos).delete(protect, deleteProductos)

module.exports = router