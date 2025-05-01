require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, 'root', process.env.PASS_WORD, {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie !');
  })
  .catch((err) => {
    console.error('Erreur de connexion :', err);
  });

module.exports = sequelize;
