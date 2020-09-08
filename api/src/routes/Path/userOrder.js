const server = require("express").Router();
const { Order, Product } = require("../../db.js");

//----------------------------------------------------------
//-------------------------CARRITO--------------------------
//----------------------------------------------------------

// AGREGAR PRODUCTOS AL CARRITO |
//-------------------------------
server.post("/:id/cart", (req, res) => {
  const { price, quantity, productId } = req.body; //Me traigo los valores del body
  const { id } = req.params; //me traigo el id del usuario

  !productId && res.send("hace falta producto");

  Order.create({
    userId: parseInt(id),
    price: price,
    quantity: quantity,
  })
    .then((order) => {
      order.addProduct(productId).then(
        () => res.send(order),
        (err) =>
          err.parent.code === "23503" && res.send("el producto no existe")
      );
    })
    .catch((err) => {
      err.parent.code === "23503"
        ? res.send("el usuario no existe")
        : res.send(err);
    });
});

// VER ITEMS DEL USUARIO |
//------------------------
server.get("/:id/orders", (req, res) => {
  //Muestra todos los items del carrito
  const { id } = req.params;
  Order.findAll({
    include: {
      model: Product,
    },
    where: { userId: parseInt(id) },
  }) //busca todos los items
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});

// VER ITEMS DEL CARRITO |
//------------------------
server.get("/:id/cart", (req, res) => {
  //Muestra todos los items del carrito
  const { id } = req.params;
  Order.findAll({
    include: {
      model: Product,
    },
    where: {
      userId: parseInt(id),
      state: "carrito",
    },
  }) //busca todos los items
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});

// COMPRAR PRODUCTOS DEL CARRITO |
//--------------------------------
server.put("/:id/buy", (req, res) => {
  const { id } = req.params;

  Order.update(
    {
      state: "creada",
    },
    {
      where: { userId: parseInt(id), state: "carrito" },
    }
  )
    .then((up) =>
      res.send(
        up[0] ? "se ejecuto la compra" : "no se encontraron los productos"
      )
    )
    .catch((err) => res.send(err));
});

// ELIMINAR PRODUCTOS AL CARRITO |
//--------------------------------
server.delete("/:id/cart", (req, res) => {
  //eliminar items del carrito
  const { id } = req.params;

  Order.update(
    {
      state: "cancelada",
    },
    {
      where: { userId: parseInt(id), state: "carrito" },
    }
  )
    .then((up) =>
      res.send(
        up[0] ? "se cancelo la compra" : "no se encontraron los productos"
      )
    )
    .catch((err) => res.send(err));
});

// EDITAR CANTIDAD DE PRODUCTOS DEL CARRITO |
//-------------------------------------------
server.put("/:id/cart", (req, res) => {
  const { id } = req.params;
  const { price, quantity, orderId } = req.body;

  (!orderId || typeof orderId === "string") &&
    res.send("el order id es invalido");

  Order.update(
    {
      quantity: quantity,
      price: price
    },
    {
      where: {
        id: orderId,
        userId: parseInt(id),
      },
    }
  )
    .then((up) => res.send(up[0] ? "se edito la cantidad" : "no se edito nada"))
    .catch((err) => res.send(err));
});

// TRAER TODAS LAS ORDENES DEL USUARIO |
//--------------------------------------
server.get("/:id/orders", (req, res) => {
  const { id } = req.params;
  Order.findAll({
    where: { userId: parseInt(id) },
  })
    .then((ordenes) => res.send(ordenes))
    .catch((error) => res.send(error));
});

  
  module.exports = server;
