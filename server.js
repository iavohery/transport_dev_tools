const express = require('express');
const app = express();
const port = 3000;


const { sequelize } = require('./Modele/index');

app.use(express.json());

const userroute = require('./route/route');
app.use('/api', userroute);

app.get('/', (req, res) => {
  res.send('Hello World depuis Express avec Sequelize !');
});

// Synchronisation DB + Démarrage du serveur
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Connexion à la base de données réussie et synchronisée');
    app.listen(port, () => {
      console.log(`Serveur lancé sur http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données :', err);
  });
