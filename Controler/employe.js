const Employe = require('../Modele/employe');
const Poste = require('../Modele/poste');
const Utilisateur = require('../Modele/utilisateur');

// CREATE
exports.createEmploye = async (req, res) => {
  try {
    const { salaire, date_embauche, idposte, iduser } = req.body;
    console.log("Données reçues :", req.body);

    const employe = await Employe.create({
      salaire,
      date_embauche,
      idposte,
      iduser
    });

    res.status(201).json({
      message: "Employé créé avec succès",
      data: employe
    });
  } catch (error) {
    console.error("Erreur lors de la création :", error);
    res.status(500).json({ error: "Erreur lors de la création de l'employé." });
  }
};

// UPDATE
exports.updateEmploye = async (req, res) => {
  try {
    const { id } = req.params;
    const { salaire, date_embauche, idposte, iduser } = req.body;

    const employe = await Employe.findByPk(id);
    if (!employe) {
      return res.status(404).json({ error: "Employé non trouvé" });
    }

    await employe.update({
      salaire,
      date_embauche,
      idposte,
      iduser
    });

    return res.status(200).json({
      message: "Employé mis à jour avec succès",
      data: employe
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    return res.status(500).json({ error: "Erreur lors de la mise à jour de l'employé." });
  }
};

// DELETE
exports.deleteEmploye = async (req, res) => {
  try {
    const { id } = req.params;

    const employe = await Employe.findByPk(id);
    if (!employe) {
      return res.status(404).json({ message: "Employé introuvable" });
    }

    await employe.destroy();

    return res.status(200).json({ message: "Employé supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    return res.status(500).json({ message: "Erreur lors de la suppression" });
  }
};

// GET ALL
exports.getAllEmployes = async (req, res) => {
  try {
    const employes = await Employe.findAll({
      order: [['idemploye', 'DESC']],
      include: [
        {
          model: Poste,
          attributes: ['idposte', 'nom_poste']
        },
        {
          model: Utilisateur,
          attributes: ['iduser', 'numcin', 'nom', 'numtel']
        }
      ]
    });

    return res.status(200).json({
      message: "Liste des employés récupérée avec succès",
      data: employes
    });
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    return res.status(500).json({ message: "Erreur lors de la récupération des employés" });
  }
};

// GET BY ID
// exports.getEmployeById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const employe = await Employe.findByPk(id, {
//       include: [
//         {
//           model: Poste,
//           attributes: ['idposte', 'nom_poste']
//         },
//         {
//           model: Utilisateur,
//           attributes: ['iduser', 'nom', 'email']
//         }
//       ]
//     });

//     if (!employe) {
//       return res.status(404).json({ message: "Employé introuvable" });
//     }

//     return res.status(200).json({
//       message: "Employé trouvé avec succès",
//       data: employe
//     });
//   } catch (error) {
//     console.error("Erreur lors de la recherche :", error);
//     return res.status(500).json({ message: "Erreur lors de la recherche" });
//   }
// };
