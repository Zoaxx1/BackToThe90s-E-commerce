const { Op } = require("sequelize");
const server = require("express").Router();
const { Product, product_categories, Category } = require("../../db.js");

//-------------------------------------------------------
//---------------------RELATIONS-------------------------
//-------------------------------------------------------

// TRAE TODAS LAS RELACIONES |
//----------------------------
server.get("/relations", (req, res) => {
  product_categories
    .findAll()
    .then((relacion) => {
      res.status(200);
      res.send(relacion);
    })
    .catch((err) => res.send(err));
});

// TRAE TODAS LOS PRODUCTOS DE UNA CATEGORIA |
//--------------------------------------------
server.get("/relations/:idCat", (req, res) => {
  const { idCat } = req.params;
  Category.findByPk(parseInt(idCat))
    .then((category) =>
      category.getProducts().then(
        (products) => res.send(products),
        (err) => res.send(err)
      )
    )
    .catch((err) => res.send(err));
});

// TRAE TODAS LAS CATEGORIAS DE UN PRODUCTO |
//-------------------------------------------
server.get("/relations/product/:idProd", (req, res) => {
  const { idProd } = req.params;
  Product.findOne({ where: { id: idProd } })
    .then((product) => {
      return product.getCategories().then(
        (categories) => res.send(categories),
        (err) => res.send(err)
      );
    })
    .catch((err) => res.send(err));
});

//-------------------------------------------------------
//---------------------SEARCH----------------------------
//-------------------------------------------------------

// BUSQUEDA DE PRODUCTO POR TITULO/DESCRIPCION |
//----------------------------------------------
server.get("/search", (req, res) => {
  const { query } = req.query;
  if (!query) return res.send("an unexpected error occurred");

  Product.findAll({
    where: {
      [Op.or]: {
        name: { [Op.iLike]: `%${query}%` },
        description: { [Op.iLike]: `%${query}%` },
      },
    },
  })
    .then((products) => {
      res.send(products);
    })
    .catch(() => res.send("an unexpected error occurred"));
});

module.exports = server;
