const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcryptjs")
const { User } = require('./db')
const LocalStrategy = require("passport-local").Strategy
const nodemailer = require('nodemailer');

const server = express();
server.name = "API";

//-----------------------------------------------
//            LOCAL STRATEGY                    |
//-----------------------------------------------
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  User.findOne({ where: { email } })
    .then(user => {
      if (!user) {
        return done(null, false, { message: `User ${email} not found` })
      } else if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Password incorrect' })
      } else return done(null, user.dataValues)
    })
})
);

//-------------------------------------
//        SERIALIZAR USUARIO          |
//-------------------------------------
passport.serializeUser((user, done) => {
  return done(null, user.id)
})

//-------------------------------------
//        DESERIALIZAR USUARIO        |
//-------------------------------------
passport.deserializeUser((id, done) => {

  User.findByPk(id)
    .then((user) => {

      return done(null, user.get())
    })
    .catch(err => done(err, false))
})

//-------------------------------------
//        POLITICAS CORS              |
//-------------------------------------
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "HEAD, GET, POST, OPTIONS, PUT, DELETE");
  next();
});


server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use(
  session({
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
  })
);

//-----------------------------------------------
//           INICIALIZAR PASSPORT Y SESSION     |
//-----------------------------------------------
server.use(passport.initialize());
server.use(passport.session());

//server.use(express.static('public'))

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  /* console.error(err); */
  res.status(status).send(message);
});

//-----------------------------------------------
//           ENVIAR EMAIL                       |
//-----------------------------------------------

server.post('/send-email', (req, res) => {
  const{ text, email } = req.body
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tienda.back90s@gmail.com',
      pass: 'Henry1234',
    }
  })

  const mailOptions = {
    from: 'Remitente',
    to: email,
    subject: 'Enviado desde Back to the 90s tienda',
    text: text
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log('Email enviado.')
      res.status(200).jsonp(req.body);
    }
  })
})

module.exports = server;