const sequelize = require('../db');
const Colis = require('./colis');
const Depense = require('./depense');
const Employe = require('./employe');
const Paiement = require('./paiement');
const Place = require('./place');
const Poids = require('./poids');
const Posseder = require('./posseder');
const Poste = require('./poste');
const Reserver = require('./reserver');
const Trajet = require('./trajet');
const Utilisateur = require('./utilisateur');
const Voiture = require('./voiture');
const Voyage = require('./voyage');
const Paiement_salaire = require('./paiment_salaire');

Trajet.hasMany(Voyage, { foreignKey: 'idtrajet' });
Voyage.belongsTo(Trajet, { foreignKey: 'idtrajet' });
Voiture.hasMany(Voyage, { foreignKey: 'idvoiture' });
Voyage.belongsTo(Voiture, { foreignKey: 'idvoiture' });
Utilisateur.hasMany(Reserver, { foreignKey: 'iduser' });
Reserver.belongsTo(Utilisateur, { foreignKey: 'iduser' });
Place.hasMany(Reserver, { foreignKey: 'idplace' });
Reserver.belongsTo(Place, { foreignKey: 'idplace' });
Paiement.hasMany(Posseder, { foreignKey: 'idpaiement' });
Posseder.belongsTo(Paiement, { foreignKey: 'idpaiement' });
Colis.hasMany(Posseder, { foreignKey: 'idcolis' });
Posseder.belongsTo(Colis, { foreignKey: 'idcolis' });
Reserver.hasMany(Posseder, { foreignKey: 'idreserver' });
Posseder.belongsTo(Reserver, { foreignKey: 'idreserver' });
Utilisateur.hasOne(Employe, { foreignKey: 'iduser' });
Employe.belongsTo(Utilisateur, { foreignKey: 'iduser' });
Poste.hasMany(Employe, { foreignKey: 'idposte' });
Employe.belongsTo(Poste, { foreignKey: 'idposte' });
Voiture.hasMany(Depense, { foreignKey: 'idvoiture' });
Depense.belongsTo(Voiture, { foreignKey: 'idvoiture' });
Poids.hasMany(Colis, { foreignKey: 'idpoids' });
Colis.belongsTo(Poids, { foreignKey: 'idpoids' });
Utilisateur.hasMany(Colis, { foreignKey: 'iduser' });
Colis.belongsTo(Utilisateur, { foreignKey: 'iduser' });
Voiture.hasMany(Place, { foreignKey: 'idvoiture' });
Place.belongsTo(Voiture, { foreignKey: 'idvoiture' });
Employe.hasMany(Paiement_salaire, { foreignKey: 'idemploye' });
Paiement_salaire.belongsTo(Employe, { foreignKey: 'idemploye' });


module.exports = {
    sequelize,
    Colis,
    Depense,
    Employe,
    Paiement,
    Place,
    Poids,
    Posseder,
    Poste,
    Reserver,
    Trajet,
    Utilisateur,
    Voiture,
    Voyage
  };