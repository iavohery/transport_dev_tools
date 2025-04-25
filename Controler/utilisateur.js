const Utilisateur = require('../models/utilisateur');

// CREATE
exports.createUtilisateur = async (req, res) => {
  try {
    const { numcin, nom, numtel } = req.body;
    console.log("Données reçues :", req.body);

    const create = await Utilisateur.create({
      numcin,
      nom,
      numtel,
    });

    res.status(201).json(create);
  } catch (error) {
    console.error("Erreur capturée :", error);
    res.status(500).json({ error: "Erreur lors de la création." });
  }
};

// UPDATE
exports.updateUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;
    const { numcin, nom, numtel } = req.body;

    const existUtilisateur = await Utilisateur.findByPk(id);

    if (!existUtilisateur) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    console.log("Utilisateur trouvé :", existUtilisateur.dataValues);

    await existUtilisateur.update({
      numcin,
      nom,
      numtel,
    });

    return res.status(200).json({
      message: "Mise à jour effectuée avec succès",
      data: existUtilisateur,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    return res.status(500).json({ error: "Erreur lors de la mise à jour." });
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

    console.log("Utilisateur à supprimer :", utilisateur);

    await utilisateur.destroy();

    return res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    return res.status(500).json({ message: "Erreur lors de la suppression" });
  }
};

// GET ALL
exports.getAllUtilisateur = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.findAll({ order: [['iduser', 'DESC']] });

    return res.status(200).json({
      message: "Liste des utilisateurs récupérée avec succès",
      data: utilisateurs,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    return res.status(500).json({ message: "Erreur lors de la récupération" });
  }
};

// GET BY ID
exports.getUtilisateurById = async (req, res) => {
  try {
    const { id } = req.params;

    const utilisateur = await Utilisateur.findByPk(id);

    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    return res.status(200).json({
      message: "Utilisateur trouvé avec succès",
      data: utilisateur,
    });
  } catch (error) {
    console.error("Erreur lors de la recherche :", error);
    return res.status(500).json({ message: "Erreur lors de la recherche" });
  }
};
