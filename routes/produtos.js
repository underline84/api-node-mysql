const express = require('express');
const router = express.Router();
const multer = require('multer');
const login = require('../middleware/login')

const ProdutoController = require('../controllers/produtos-controller');

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './uploads');
    },
    filename: function(req, file, callback){
        let data = new Date().toISOString().replace(/:/g, '-') + '-';
        callback(null, data + file.originalname);
    }
});

// DEFININDO FILTRO DE ARQUIVO ENVIADO
const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        callback(null, true);
    }else{
        callback(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// LISTA TODOS PRODUTOS
router.get('/', ProdutoController.getProdutos);

// INSERE UM PRODUTO
router.post('/', login.obrigatorio, upload.single('produto_imagem'), ProdutoController.postProduto);

// BUSCA UM PRODUTO
router.get('/:id_produto', ProdutoController.getUmProduto);

// ALTERA UM PRODUTO
router.patch('/', login.obrigatorio, ProdutoController.updateProduto);

// DELETA UM PRODUTO
router.delete('/', login.obrigatorio, ProdutoController.deleteProduto);

module.exports = router;