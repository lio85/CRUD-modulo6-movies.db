var express = require('express');
var router = express.Router();
const peliculasController= require('../controllers/peliculasController');

router.get('/postman', peliculasController.api);
router.get('/postman/search', peliculasController.search)
// vaa  reaccionar con este URL: es para buscar por titulo ---> localhost:3000/peliculas/postman/search/?keyword=mo
router.get('/postman/:id', peliculasController.show);
router.post('/postman', peliculasController.store);
router.delete('/postman/delete/:id', peliculasController.delete)



// Creacion (Create)
router.get('/crear', peliculasController.crear); 

router.post('/crear', peliculasController.guardado);

// Lectura (Read)  
router.get('/', peliculasController.listado);

// Detalle
router.get('/:id', peliculasController.detalle);

// Actualizacion
router.get('/editar/:id', peliculasController.editar);
router.post('/editar/:id', peliculasController.actualizar);
// aca debiere ser router.put o .patch

// Borrado

router.post('/borrar/:id', peliculasController.borrar);
// aca debiera ser router.delete



module.exports = router;