const server = require('express').Router();
const { Category } = require('../../db.js');

//----------------------------------------------------------
//-------------------------CATEGORIAS-----------------------
//----------------------------------------------------------

function IsAdmin(req,res,next){
    if(req.user.access == 'Admin'){
        next()
    }
    else{
        res.status(401).send('no esta autorizado')
    }
}

// TRAE TODAS LAS CATEGORIAS |
//----------------------------
server.get('/', (req, res) => {
    Category.findAll()
        .then(category => {
            
            res.status(200)
            res.send(category);
        })
        .catch(err => res.send(err));
});

// CREA UNA CATEGORIA |
//---------------------
server.post('/', (req, res) => {
    //crear categoría
    const { name, description } = req.body; // traigo name y description para agregarlos en la tabla
    if (!name) return res.send('no se puede agregar la categoría porque falta el "name"')
    Category.create({	// creo el registro de la categoría y le grabo los valores
        name,
        description
    }).then((category) => {	// devuelvo la categoría creada en un json
        res.send(category)
    })
})

// MODIFICA UNA CATEGORIA |
//-------------------------
server.put('/:id', IsAdmin, (req, res) => {
    // modifica categoría
    const id = req.params.id; //me guardo el id que me pasan por query
    const { name, description } = req.body; //Me traigo los valores del body

    Category.findOne({ where: { id: id } })
        .then((category) => {
            if (!category) res.send('category not found') //no encuentra la categoría
            else {
                category.update({ name, description }) //actualiza los datos
                res.send(category) //muestra la categoría
            }
        })
        .catch(err => res.send('an unexpected error occurred')) //error inesperado
})

// ELIMINA UNA CATEGORIA |
//------------------------
server.delete('/:id', IsAdmin, (req, res) => {
    //elimina categoría
    const id = req.params.id; //me guardo el id que me pasan por query
    Category.destroy({ //destruyo el registro cuando el id sea igual al id de la query
        where: { id: id }
    })
        .then((category) => {
            if (category) res.send('category eliminated') //si elimina
            else res.send('category not found') //si no elimina
        })
        .catch(err => res.send('an unexpected error occurred')) //error inesperado
})

module.exports = server;