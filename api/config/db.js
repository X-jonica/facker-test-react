const { Pool } = require("pg");
require("dotenv").config();

// configuration de la pool de connexion
const pool = new Pool({
   user: process.env.PGUSER,
   host: process.env.PGHOST,
   database: process.env.PGDATABASE,
   password: process.env.PGPASSWORD,
   port: process.env.PGPORT,
});

// test de connexion au demarage
(async () => {
   try {
      await pool.query("SELECT NOW()");
      console.log("✅ Connecté à PostgreSQL avec succès");
   } catch (error) {
      console.error("❌ Erreur de connexion à PostgreSQL,", error);
   }
})();

// export du fichier pour pouvoir l utilisé dans un autre fichier
module.exports = {
   query: (text, params) => pool.query(text, params),
   close: () => pool.end(),
};
