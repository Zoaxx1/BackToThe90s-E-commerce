const { DataTypes } = require("sequelize");
// Exportamos una función que define el modelo
// Luego le inyectamos la conexión a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("review", {
    qualification: {
      type: DataTypes.ENUM,
      values: ["0", "1", "2", "3", "4", "5"],
      defaultValue: "0",
    },
    opinion: {
      type: DataTypes.STRING,
    },
    userName:{
      type: DataTypes.STRING
    },
    productId: {
      type: DataTypes.INTEGER
    },
  });
};
