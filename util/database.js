const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'mark123456', {
    dialect: 'mysql',
    host: 'localhost'
});



module.exports = sequelize;