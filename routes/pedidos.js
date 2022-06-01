const express = require('express');
const router = express.Router();

const PedidosController = require('../controllers/pedidos-controller');

// LISTA TODOS PEDIDOS
router.get('/', PedidosController.getPedidos);

// INSERE UM PEDIDO
router.post('/', PedidosController.postPedidos);

// BUSCA UM PEDIDO
router.get('/:id_pedido', PedidosController.getUmPedido);

// DELETA UM PEDIDO
router.delete('/', PedidosController.deletePedido);

module.exports = router;