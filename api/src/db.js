require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/development`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Inyectamos la conexión (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Product, Category, Order, User, Review } = sequelize.models;

//-----------------------^^^^^^^^^^^^^^^^^^^^^^-------------------------------//
//-----------------------||||||||||||||||||||||-------------------------------//
//-----------------------||--DECLARACIONES--|||-------------------------------//
//-----------------------||||||||||||||||||||||-------------------------------//
//-----------------------|||--RELACIONES--|||||-------------------------------//
//-----------------------||||||||||||||||||||||-------------------------------//
//-----------------------vvvvvvvvvvvvvvvvvvvvvv-------------------------------//

// producto muchos categorias ------------> crea product_categories
// categoria muchos productos -----------> crea product_categories
Product.belongsToMany(Category, { through: "product_categories" });
Category.belongsToMany(Product, { through: "product_categories" });

// usuario muchas ordenes ---------------> crea userId en order
// orden un usuario ---------------------> utiliza userId
User.hasMany(Order);
Order.belongsTo(User);

// orden muchos productos ------------> crea lineorder
// producto muchas ordenes -----------> crea lineorder
Order.belongsToMany(Product, { through: "lineorder" });
Product.belongsToMany(Order, { through: "lineorder" });

// Un usuario tiene muchas review ------------> crea review_user
// Un review tiene muchas usuario -----------> crea review_user
User.belongsToMany(Review, { through: "user_review" });
Review.belongsToMany(User, { through: "user_review" });

// Un producto tiene muchas reviews------------> crea productId en review
// Una review tiene un solo producto-----------> utiliza productID
Product.hasMany(Review);
Review.belongsTo(Product);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
