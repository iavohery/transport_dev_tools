const Utilisateur = require('../Modele/utilisateur');
const Employe = require('../Modele/employe');

// CREATE
exports.createUtilisateur = async (req, res) => {
  try {
    const { numcin, nom, numtel, mot_passe } = req.body;

    const utilisateur = await Utilisateur.create({
      numcin,
      nom,
      numtel,
      mot_passe
    });

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      data: utilisateur
    });
  } catch (error) {
    console.error("Erreur lors de la création :", error);
    res.status(500).json({ error: "Erreur lors de la création de l'utilisateur." });
  }
};

// UPDATE
exports.updateUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;
    const { numcin, nom, numtel, mot_passe } = req.body;

    const utilisateur = await Utilisateur.findByPk(id);
    if (!utilisateur) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    await utilisateur.update({
      numcin,
      nom,
      numtel,
      mot_passe
    });

    return res.status(200).json({
      message: "Utilisateur mis à jour avec succès",
      data: utilisateur
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    return res.status(500).json({ error: "Erreur lors de la mise à jour de l'utilisateur." });
  }
};

// DELETE
exports.deleteUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;

    const utilisateur = await Utilisateur.findByPk(id);
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    await utilisateur.destroy();

    return res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    return res.status(500).json({ message: "Erreur lors de la suppression" });
  }
};

// GET ALL
exports.getAllUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.findAll({
      order: [['iduser', 'DESC']],
      include: {
        model: Employe,
        attributes: ['idemploye', 'salaire', 'date_embauche', 'idposte']
      }
    });

    return res.status(200).json({
      message: "Liste des utilisateurs récupérée avec succès",
      data: utilisateurs
    });
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    return res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};

// GET BY ID
// exports.getUtilisateurById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const utilisateur = await Utilisateur.findByPk(id, {
//       include: {
//         model: Employe,
//         attributes: ['idemploye', 'salaire', 'date_embauche', 'idposte']
//       }
//     });

//     if (!utilisateur) {
//       return res.status(404).json({ message: "Utilisateur introuvable" });
//     }

//     return res.status(200).json({
//       message: "Utilisateur trouvé avec succès",
//       data: utilisateur
//     });
//   } catch (error) {
//     console.error("Erreur lors de la recherche :", error);
//     return res.status(500).json({ message: "Erreur lors de la recherche" });
//   }
// };
