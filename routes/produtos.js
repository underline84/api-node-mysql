const express = require('express');
const router = express.Router();
const mysql = require('../database/mysql').pool;

// LISTA TODOS PRODUTOS
router.get('/', (req, res, next) =>{
    res.status(200).send({
        mensagem: 'Usando GET rota produtos'
    });
});

// INSERE UM PRODUTO
router.post('/', (req, res, next) =>{

    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field) =>{
                conn.release();
                if(error){
                    res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                res.status(201).send({
                    mensagem: 'Produto inserido com sucesso',
                    id_produto: resultado.insertId
                });
            }            
        );
    });
});

// BUSCA UM PRODUTO
router.get('/:id_produto', (req, res, next) =>{
    const id = req.params.id_produto;
    res.status(200).send({
        mensagem: 'Usando GET de um produto',
        id: id
    });
});

// ALTERA UM PRODUTO
router.patch('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'Usando o PATH rota produtos'
    });
});

// DELETA UM PRODUTO
router.delete('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'Usando o DELETE rota produtos'
    });
});

module.exports = router;