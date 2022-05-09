let db= require("../database/models"); // require de la variable db, exportada desde models/index.js. Como el nombre del archivo se llama index no hace falta especificarlo
// esta variable db es la que nos va a permitir interactuar con la base de datos

const Op=db.Sequelize.Op;

const peliculasController= {

    // Api
    api: function(req,res){
        db.Pelicula
            .findAll()
            .then(movies=>{
                return res.status(200).json({
                    total: movies.length,
                    data: movies,
                    status: 200
                });
            })
    },
    show: function(req,res){
        db.Pelicula
            .findByPk(req.params.id)
            .then(movie=>{
                return res.status(200).json({
                    data: movie,
                    status: 200
                });
            })
    },
    store: function(req,res){
        db.Pelicula
            .create(req.body)
            .then(movie=>{
                return res.status(200).json({
                    data: movie,
                    status: 200,
                    created: 'ok'
                });
            })
    },
    delete: (req,res)=>{
        db.Pelicula.
            destroy( { where: { id: req.params.id } } )
            .then((response)=>{
                return res.json(response)
            })
    },
    search: (req,res)=>{
        db.Pelicula.
            findAll( {
                where: {
                    title: { [Op.like]: '%'+req.query.keyword+'%' }
                }
            })
            .then((movies)=>{
                if(movies.length>0){
                    return res.status(200).json(movies);
                } else {
                    return res.status(200).json('no existen peliculas');
                }
            })

    },
    // Api
    

    crear: function(req,res){
        db.Genero.findAll()  // trae los campos especificados en Genero de todos los registros de la tabla genres como un array de objetos
            .then(function(generos){
                res.render('creacionPeliculas',{generos});
            })
    },
    guardado: function(req,res){
        db.Pelicula.create({
            title: req.body.titulo,
            awards: req.body.premios,
            release_date: req.body.fecha_estreno,
            genre_id: req.body.genero,
            length: req.body.duracion,
            rating: req.body.rating
        })
        res.redirect('/peliculas');
    },
    listado: function(req,res){
        db.Pelicula.findAll()
            .then(function(peliculas){
                res.render('listadoPeliculas',{peliculas});
            })
    },
    detalle: function(req,res){
        db.Pelicula.findByPk(req.params.id, {include: [{association: 'genero'}, {association: 'actores'}] } )
            .then(function(pelicula){
                res.render('detallePelicula',{pelicula});
            })
    },
    editar: function (req,res){
        let pedidoPelicula= db.Pelicula.findByPk(req.params.id)
        let pedidoGeneros= db.Genero.findAll()

        Promise.all([pedidoPelicula, pedidoGeneros])
            .then(function([pelicula, generos]){
                res.render('editarPelicula',{pelicula, generos});
            })
    },
    actualizar: function(req,res){
        db.Pelicula.update({
            title: req.body.titulo,
            awards: req.body.premios,
            release_date: req.body.fecha_estreno,
            genre_id: req.body.genero,
            length: req.body.duracion,
            rating: req.body.rating
        }, {
            where:{
                id:req.params.id
            }
        });  
        res.redirect('/peliculas/'+req.params.id);
    },
    borrar: function(req,res){
        db.Pelicula.destroy({
            where: {
                id: req.params.id
            }
        })
        // aca faltaria configurar que si en la pelicula hay actuaciones, primero hay que borrar las actuaciones
        res.redirect('/peliculas');
    }

}

module.exports= peliculasController;

