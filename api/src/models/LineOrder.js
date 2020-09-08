const { DataTypes } = require('sequelize');
// Exportamos una función que define el modelo
// Luego le inyectamos la conexión a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('lineorder', {
        price: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }
    })
}