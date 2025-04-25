const express = require('express');
const Utilisateur = require('../models/utilisateur');

exports.createEnseignant = async (req, res) => {
    try {
      const { nom, email, numero_tel, nombre_heure, taux_horaire, salaire } =
        req.body;
      console.log("Données reçues :", req.body);
      const create = await enseignant.create({
        nom,
        email,
        numero_tel,
        nombre_heure,
        taux_horaire,
        salaire,
      });
      res.status(201).json(create);
    } catch (error) {
      console.error("Erreur capturée :", error);
      res.status(500).json({ error: "Erreur lors de la création." });
    }
  };
  
  exports.updateEnseignant = async (req, res) => {
    try {
      const { id } = req.params;
      const { nom, email, numero_tel, nombre_heure, taux_horaire, salaire } =
        req.body;
  
      const existEnseignant = await enseignant.findByPk(id);
  
      if (!existEnseignant) {
        return res.status(404).json({ error: "Enseignant non trouvé" });
      }
  
      console.log("Enseignant trouvé :", existEnseignant.dataValues);
  
      await existEnseignant.update({
        nom,
        email,
        numero_tel,
        nombre_heure,
        taux_horaire,
        salaire,
      });
  
      return res.status(200).json({
        message: "Mise à jour effectuée avec succès",
        data: existEnseignant,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      return res.status(500).json({ error: "Erreur lors de la mise à jour." });
    }
  };
  
  exports.deleteEnseignant = async (req, res) => {
    try {
      const { id } = req.params;
  
      const idExist = await enseignant.findByPk(id);
  
      if (!idExist)
        return res.status(404).json({ message: "Enseignant introuvable" });
  
      console.log("ts mety tazy ", idExist);
  
      await idExist.destroy();
  
      return res.status(200).json({ message: "Enseignant supprimé avec succès" });
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      return res.status(500).json({ message: "Erreur lors de la suppression" });
    }
  };
  
  exports.getAllEnseignants = async (req, res) => {
    try {
      const enseignants = await enseignant.findAll( {order: [['id', 'DESC']]});
  
      return res.status(200).json({
        message: "Liste des enseignants récupérée avec succès",
        data: enseignants,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
      return res.status(500).json({ message: "Erreur lors de la récupération" });
    }
  };
  
  exports.getEnseignantById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const enseignantUnique = await enseignant.findByPk(id);
  
      if (!enseignantUnique) {
        return res.status(404).json({ message: "Enseignant introuvable" });
      }
  
      return res.status(200).json({
        message: "Enseignant trouvé avec succès",
        data: enseignantUnique,
      });
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
      return res.status(500).json({ message: "Erreur lors de la recherche" });
    }
  };