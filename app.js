const express = require('express');
const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// MONITORA E GERA LOGS
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false})); // apenas dados simples
app.use(bodyParser.json()); // somente entrada json no body

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control_Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS'){
        res.header('Access_Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).send({});
    } 
    next();   
});

app.use('/produtos', rotaProdutos);

app.use('/pedidos', rotaPedidos);

app.use((req, res, next) => {
    const erro = new Error('Rota não encontrada');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});


module.exports = app;