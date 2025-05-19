const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(
   process.env.SUPABASE_URL,
   process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Test de connexion (exemple de requête)
(async () => {
   const { data, error } = await supabase.from("personne").select("*").limit(1);

   if (error) {
      console.error("❌ Erreur de connexion à Supabase :(", error.message);
   } else {
      console.log("✅ Connecté à Supabase via le client JS :)");
   }
})();

// export du fichier pour pouvoir l utilisé dans un autre fichier
module.exports = supabase;
