const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const { getAllPersons, helloWorld } = require("./controllers/userController");

const app = express();
const port = 3000;

// Autoriser le CORS
app.use(cors());

// OU configuration plus sécurisée pour spécifier des origines précises :
app.use(
   cors({
      origin: "http://localhost:5173", // Remplacez par l'URL de votre frontend
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type"],
   })
);

// Utilisation de morgan pour voir les reqettes executer depuis le server
app.use(morgan("dev")).use(bodyParser.json());

// Route
app.get("/", helloWorld);

//Route pour recuperer les données de la table personne
app.get("/personne", getAllPersons);

app.listen(port, () => {
   console.log(`serveur start in : http://localhost:${port}`);
});
