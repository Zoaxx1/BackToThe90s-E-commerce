const { DataTypes } = require("sequelize");
// Exportamos una función que define el modelo
// Luego le inyectamos la conexión a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("order", {
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    state: {
      type: DataTypes.ENUM,
      values: ["carrito", "creada", "procesando", "cancelada", "completa"],
      defaultValue: "carrito",
    },
  });
};
