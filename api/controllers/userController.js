const db = require("../config/db");
const { success } = require("../config/helper");

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

module.exports = { getAllPersons, helloWorld };
