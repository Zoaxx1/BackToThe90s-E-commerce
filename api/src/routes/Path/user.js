const server = require("express").Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User, Order, Product } = require("../../db.js");
const bcrypt = require("bcryptjs");

//----------------------------------------------------------
//-------------------------USUARIO--------------------------
//----------------------------------------------------------

//-------------------------------------
//           RUTA LOGIN               |
//-------------------------------------
server.post("/login", passport.authenticate("local"), (req, res) => {
  const { guest } = req.body;
  const idUser = req.user.id;

  // MIGRAR CARRITO DE GUEST AL NUEVO USUARIO
  guest && guest.forEach((product) => {
    Order.create({
      userId: parseInt(idUser),
      price: product.price,
      quantity: product.quantity,
    })
      .then((creado) => {
        creado.addProduct(product.productId);
      })
      .catch((err) => {
        console.log(err)
      });
  })

  res.send(req.user);
});




//-------------------------------------
//    RUTA FIND OR CREATE GOOGLE      |
//-------------------------------------
server.post('/login/google', (req, res) => {
  const { name, surname, email, password, access, img, guest } = req.body;

  User.findOrCreate({
    where: { email },
    defaults: {
      name, surname, email, password, access
    }
  })
    .then(user => {
      guest && guest.forEach((product) => {
        Order.create({
          userId: user[0].dataValues.id,
          price: product.price,
          quantity: product.quantity,
        })
          .then((creado) => {
            creado.addProduct(product.productId);
          })
          .catch((err) => {
            console.log(err)
          });
      })
      
      //envio el usuario
      res.send(user[0])
    })
    .catch(err => res.send(err))
})

//-------------------------------------
//           RUTA LOGOUT               |
//-------------------------------------
server.get("/logout", (req, res) => {
  req.logout();
  res.send("se deslogueo");
});

//-------------------------------------
//      FUNCION AUTENTICAR USUARIO    |
//-------------------------------------
function estaAutenticado(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("no esta autenticado");
  }
}

//-------------------------------------
//       RUTA GET USER LOGUEADO       |
//-------------------------------------
server.get("/me", estaAutenticado, function (req, res) {
  res.json(req.user);
});

//-------------------------------------
//     RUTA PROMOVER USER A ADMIN     |
//-------------------------------------
server.put("/promote/:id", (req, res) => {
  const id = req.params.id; //me guardo el id que me pasan por query
  User.findByPk(id)
    .then((user) => {
      const { name, surname, email, password } = user;
      if (!user) res.send("user not found");
      //no encuentra el usuario
      else {
        user.update({ name, surname, email, password, access: "Admin" }); //actualiza los datos
        res.send(user); //muestra el usuario
      }
    })
    .catch((err) => res.send("an unexpected error occurred")); //error inesperado
});

// GET ALL USERS///////////////

server.get("/users", (req, res) => {
  User.findAll()
    .then((users) => res.send(users))
    .catch((err) => res.send(err));
});

// CREAR USUARIO |
//----------------
server.post("/register", (req, res) => {
  const { name, surname, email, password, access } = req.body; //Me traigo los valores del body

  if (!name || !surname || !email || !password) {
    //Sino cumple con dichos campos no se ejecuta
    return res.send("Todos los campos son obligatorios");
  }

  User.findOne({ where: { email } }).then((user) => {
    if (!user) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      User.create({
        //Crea el registro de usuario y le graba los valores
        name: name,
        surname: surname,
        email: email,
        password: hash,
        access: access,
      })
        .then((user) => {
          res.send(user); //Guarda en un json
        })
        .catch((err) => res.send("El email debe ser unico"));
    } else {
      res.send("el usuario ya existe");
    }
  });
});

// MODIFICA UN USUARIO |
// ----------------------
server.put("/:id", (req, res) => {
  // modifica usuario
  const id = req.params.id; //me guardo el id que me pasan por query
  const { name, surname } = req.body; //Me traigo los valores del body
  User.findOne({ where: { id: id } })
    .then((user) => {
      if (!user) res.send("user not found");
      //no encuentra el usuario
      else {
        email = user.email
        pass = user.password
        user.update({ name, surname, email, pass }); //actualiza los datos
        res.send(user); //muestra el usuario
      }
    })
    .catch((err) => res.send("an unexpected error occurred")); //error inesperado
});

////////////////BUSCAR EMAIL Y DEVOLVER ID//////////////////
server.post('/passwordReset', (req, res) => {
  const { email } = req.body;

  User.findOne({ where: { email } })
    .then((user) => res.send(user.dataValues.id.toString()))
    .catch((err) => res.send(err))
})

////////////////RESET PASSWORD//////////////////
server.put('/:id/passwordReset', (req, res) => {
  const { newPassword } = req.body
  const id = req.params.id
  User.findByPk(id)
    .then((user) => {
      var salt = bcrypt.genSaltSync(10);
      var newHash = bcrypt.hashSync(newPassword, salt);
      const { name, surname, email } = user;
      user.update({ name, surname, email, password: newHash });
      res.send("Las password fue reseteada");
    })
    .catch((err) => res.send(err))
})


//////////////// DELETE USER ////////////////
server.delete('/:id', (req, res) => {
  const id = req.params.id

  User.destroy({
    //destruyo el registro cuando el id sea igual al id de la query
    where: { id: id },
  })
    .then((user) => {
      if (user) res.send("user eliminated");
      //si elimina
      else res.send("user not found"); //si no elimina
    })
    .catch((err) => res.send("an unexpected error occurred"));
})

module.exports = server;
