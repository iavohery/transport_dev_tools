const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('transport', 'root', '', {
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
