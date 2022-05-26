const express = require('express');
const router = express.Router();

// LISTA TODOS PEDIDOS
router.get('/', (req, res, next) =>{
    res.status(200).send({
        mensagem: 'Retorna os pedidos'
    });
});

// INSERE UM PEDIDO
router.post('/', (req, res, next) =>{

    const pedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    }

    res.status(201).send({
        mensagem: 'O pedido foi criado',
        pedidoCriado: pedido
    });
});

// BUSCA UM PEDIDO
router.get('/:id_pedido', (req, res, next) =>{
    const id = req.params.id_pedido;
    res.status(200).send({
        mensagem: 'Detalhes do pedido',
        id: id
    });
});

// DELETA UM PEDIDO
router.delete('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'Pedido excluido'
    });
});

module.exports = router;