const supabase = require("../config/db");
const { success } = require("../config/helper");
const { faker } = require("@faker-js/faker");

const helloWorld = (req, res) => {
   res.send("Hello World!");
};

// 🟢 GET: récupérer toutes les personnes
const getAllPersons = async (req, res) => {
   try {
      let { data: personne, error } = await supabase
         .from("personne")
         .select("*");

      if (error) {
         console.error(error);
         return res
            .status(500)
            .json({ error: "Erreur lors de la récupération" });
      }

      const message = "Données de la table personne récupérées avec succès";
      res.json(success(message, personne));
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
   }
};

// 🟢 POST: insérer une personne fictive avec Faker
const insertFakePerson = async (req, res) => {
   try {
      const nom = faker.person.lastName();
      const prenom = faker.person.firstName();
      const sexe = Math.random() < 0.5 ? "Homme" : "Femme";
      const nationalite = faker.location.country();

      const { data, error } = await supabase
         .from("personne")
         .insert([{ nom, prenom, sexe, nationalite }])
         .select();

      if (error) {
         console.error(error);
         return res.status(500).json({ error: "Erreur lors de l'insertion" });
      }

      const message = "Personne fictive ajoutée avec succès";
      res.json(success(message, data[0]));
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
   }
};


// 🔴 DELETE: supprimer une personne par son ID
const deletePersonById = async (req, res) => {
   const { id } = req.params;

   try {
      const { data, error } = await supabase
         .from("personne")
         .delete()
         .eq("id", id)
         .select(); // Important : pour récupérer les données supprimées

      if (error) {
         console.error(error);
         return res
            .status(500)
            .json({ error: "Erreur lors de la suppression" });
      }

      if (!data || data.length === 0) {
         return res
            .status(404)
            .json({ error: "Aucune personne trouvée avec cet ID" });
      }

      res.json({ message: "Personne supprimée avec succès", data });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
   }
};


module.exports = {
   getAllPersons,
   helloWorld,
   insertFakePerson,
   deletePersonById,
};
