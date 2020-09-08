const server = require("express").Router();
const { Order, Product, User } = require("../../db.js");

//-------------------------------------------------------
//---------------------ORDERS----------------------------
//-------------------------------------------------------

// TRAE TODAS LAS ORDENES |
//-------------------------
server.get("/", (req, res) => {
  //Muestra todas las órdenes
  Order.findAll({ include: [{ model: Product }, { model: User }] }) //busca todas las órdenes
    .then((order) => {
      res.send(order);
    })
    .catch((err) => res.send(err));
});

// TRAE UNA ORDEN POR ID |
//------------------------
server.get("/:id", (req, res) => {
  const { id } = req.params;
  Order.findByPk(id)
    .then((order) =>
      res.send(
        order
          ? order //si el order existe lo muestra
          : "el orden no existe" //si no existe muestra este msj
      )
    )
    .catch((err) => res.send(err));
});

// TRAE ORDENES POR UserID |
//----------------------------
server.get('/user/:id', (req, res) => {
  const { id } = req.params

  User.findOne({ where: { id } })
    .then(user => {
      user.getOrders({ include: [{ model: Product }, { model: User }] })
        .then(
          products => res.send(products),
          err => res.send(err)
        )
    })
    .catch(err => res.send(err))
})

// MODIFICA UNA ORDEN POR ID |
//----------------------------
server.put("/:id", (req, res) => {
  //Modifica una orden por ID
  const { id } = req.params;
  const { price, quantity, state } = req.body;

  Order.update(
    {
      price: price,
      quantity: quantity,
      state: state,
    },
    {
      where: { id: id },
    }
  ) //edita una orden en particular
    .then((update) =>
      res.send(
        update[0]
          ? "el orden se pudo editar" //si el order existe la edita
          : "el orden no existe" //si no existe muestra este msj
      )
    )
    .catch((err) =>
      res.send(
        err.parent.code === "22P02"
          ? "El estado debe ser : 'carrito', 'creada', 'procesando', 'cancelada', 'completa'"
          : err
      )
    );
});

module.exports = server;
