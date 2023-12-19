const express = require('express')
const router = express.Router()
const {getPedidos, setPedidos, updatePedidos, deletePedidos} = require('../controllers/pedidosController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getPedidos).post(protect, setPedidos)
router.route('/:id').put(protect, updatePedidos).delete(protect, deletePedidos)

module.exports = router