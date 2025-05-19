const db = require("../config/db");
const { success } = require("../config/helper");
// importer faker depuis @faker-js/faker
const { faker } = require("@faker-js/faker");

const helloWorld = (req, res) => {
   res.send("Hello World!");
};

const getAllPersons = async (req, res) => {
   try {
      const { rows } = await db.query("SELECT * FROM personne");
      const message = "Données de la table personne recuperé avec success";
      res.json(success(message, rows));
   } catch (error) {
      console.error(error);
   }
};

// Insérer une fausse personne avec Faker
const insertFakePerson = async (req, res) => {
   try {
      // Générer des données fictives
      const nom = faker.person.lastName();
      const prenom = faker.person.firstName();

      // Faker ne génère pas directement "homme" ou "femme", donc on choisit au hasard
      const sexe = Math.random() < 0.5 ? "Homme" : "Femme";

      // On utilise un pays fictif comme nationalité
      const nationalite = faker.location.country();

      // Requête SQL d'insertion
      const query = `
         INSERT INTO personne (nom, prenom, sexe, nationalite)
         VALUES ($1, $2, $3, $4)
         RETURNING *
      `;
      const values = [nom, prenom, sexe, nationalite];

      // Exécution de la requête
      const { rows } = await db.query(query, values);

      const message = "Personne fictive ajoutée avec succès";
      res.json(success(message, rows[0]));
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de l'insertion" });
   }
};

// 🧹 Supprimer une personne par son ID
const deletePersonById = async (req, res) => {
   const { id } = req.params;

   try {
      const { rowCount } = await db.query(
         "DELETE FROM personne WHERE id = $1",
         [id]
      );

      if (rowCount === 0) {
         return res
            .status(404)
            .json({ error: "Aucune personne trouvée avec cet ID" });
      }

      res.json(success("Personne supprimée avec succès"));
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la suppression" });
   }
};

module.exports = {
   getAllPersons,
   helloWorld,
   insertFakePerson,
   deletePersonById,
};
