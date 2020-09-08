const server = require("express").Router();
const { Product } = require("../../db.js");

//----------------------------------------------------------
//-------------------------PRODUCTOS------------------------
//----------------------------------------------------------

function IsAdmin(req,res,next){
  if(req.user.access == 'Admin'){
    
      next()
  }
  else{
      res.status(401).send('no esta autorizado')
  }
}

// TRAE TODOS LOS PRODUCTOS |
//---------------------------
server.get("/", (req, res, next) => {
  // busca y muestra todos los productos
  Product.findAll() //busca todos los productos
    .then((products) => {
      res.send(products);
    })
    .catch(next);
});

// TRAE UN PRODUCTO POR ID |
//--------------------------
server.get("/:id", (req, res, next) => {
  // busca un producto por idParam
  const { id } = req.params;

  Product.findOne({ where: { id: id } }) //busca el producto
    .then((product) => {
      if (!product) return res.send("product not found");
      res.send(product);
    })
    .catch(next);
});

// AGREGAR UN PRODUCTO |
//----------------------
server.post("/", (req, res) => {
  //Agregar/Crear producto
  const { name, description, price, stock, category, img } = req.body; //Me traigo los valores del body
  if (!name || !price) {
    //Sino cumple con dichos campos no se ejecuta
    return res.send("Es necesario completar el campo name y price");
  }
  Product.create({
    //Crea el registro de los productos y le graba los valores
    name: name,
    description: description,
    price: price,
    stock: stock,
    img: img,
  }).then((product) => {
    return product.setCategories(category).then(
      () => res.send(product),
      () => res.send('no se pudo agregar la categoria'))
  }).catch((err) => res.send(err))
})

// MODIFICA UN PRODUCTO |
//-----------------------
server.put("/:id", IsAdmin,(req, res) => {
  //modificar producto
  const id = req.params.id; //me guardo el id que me pasan por query
  const { name, description, price, stock, category, img } = req.body; //Me traigo los valores del body

  Product.findOne({ where: { id: id } })
    .then((product) => {
      if (!product) {
        res.send("product not found"); // no encuentra el producto
      } else {
        product.update({
          // actualiza los datos
          name,
          description,
          price,
          stock,
          category,
          img,
        });
        res.send(product); // muestra el producto modificado
      }
    })
    .catch((err) => res.send("an unexpected error occurred")); //error inesperado
});

// MODIFICA LA CANTIDAD DEL PRODUCTO |
//------------------------------------
server.put("/:id/quantity",(req, res) => {
  const id = req.params.id; //me guardo el id que me pasan por query
  const { stock } = req.body; //Me traigo los valores del body

  Product.findOne({ where: { id } })
  .then((product) => {
    if (!product) {
      res.send("product not found"); // no encuentra el producto
    } else {
      product.update({ stock });
      res.send(product); // muestra el producto modificado
    }
  })
  .catch((err) => res.send("an unexpected error occurred")); //error inesperado
})


// ELIMINA UN PRODUCTO |
//----------------------
server.delete("/:id", (req, res) => {
  // eliminar producto
  const id = req.params.id; //me guardo el id que me pasan por query
  
  Product.destroy({
    //destruyo el registro cuando el id sea igual al id de la query
    where: { id: id },
  })
    .then((product) => {
      if (product) res.send("product eliminated");
      //si elimina
      else res.send("product not found"); //si no elimina
    })
    .catch((err) => res.send("an unexpected error occurred")); //error inesperado
});

module.exports = server;
