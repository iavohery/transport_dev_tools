const Paiement_salaire = require('../Modele/paiment_salaire');
const Employe = require('../Modele/paiment_salaire');
const Utilisateur = require('../Modele/utilisateur');

// CREATE
exports.createPaiement_salaire = async (req, res) => {
  try {
    const { idpaiment_salaire, date_paiement, mois_salaire, idemploye } = req.body;
    console.log("Données reçues :", req.body);

    const create = await Paiement_salaire.create({
        idpaiment_salaire,
        date_paiement,
        mois_salaire,
        idemploye
    });

    res.status(201).json(create);
  } catch (error) {
    console.error("Erreur lors de la création :", error);
    res.status(500).json({ error: "Erreur lors de la création du Paiement_salaire." });
  }
};

// GET ALL
exports.getAllPaiement_salaire = async (req, res) => {
    try {
      const salaires = await Paiement_salaire.findAll({ 
        order: [['idpaiment_salaire', 'DESC']],
        include: [
          {
            model: Employe,
            attributes: ['idemploye', 'salaire', 'date_embauche'],
            include:[
                {
                    model: Utilisateur,
                    attributes: ['iduser', 'numcin', 'nom', 'numtel']
                }
            ]
          }
        ]
      });
  
      return res.status(200).json({
        message: "Liste des salaires payes récupérée avec succès",
        data: voitures,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
      return res.status(500).json({ message: "Erreur lors de la récupération" });
    }
  };