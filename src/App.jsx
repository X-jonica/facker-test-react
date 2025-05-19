import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
   const [persons, setPersons] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   //Recuperation des donnees
   const getPersonnes = async () => {
      try {
         const response = await axios.get("http://localhost:3000/personne");
         setPersons(response.data.data);
         setLoading(false);
      } catch (error) {
         setError(error.message);
         setLoading(false);
      }
   };

   //Methode d'Ajout via faker
   const handleActivateFaker = async () => {
      try {
         const response = await axios.post(
            "http://localhost:3000/personne/faker"
         );
         console.log("Personne générée :", response.data);
         setLoading(false);
         getPersonnes();
      } catch (error) {
         console.error(error.message);
         setLoading(false);
      }
   };

   // Methode pour supprimer une personne
   const handleDeletePerson = async (id) => {
      const confirmDelete = window.confirm(
         "Êtes-vous sûr de vouloir supprimer cette personne ?"
      );

      if (!confirmDelete) return;

      try {
         await axios.delete(`http://localhost:3000/personne/${id}`);
         getPersonnes(); // Rafraîchir la liste
      } catch (error) {
         console.error("Erreur de suppression :", error.message);
      }
   };

   useEffect(() => {
      getPersonnes();
   }, []);

   if (loading) return <div className="p-4 text-center">Chargement...</div>;
   if (error) return <div className="p-4 text-red-500">Erreur: {error}</div>;

   return (
      <>
         <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
               <h1 className="text-2xl font-bold">Liste des Personnes</h1>

               {/* Bouton Activer Faker */}
               <button
                  onClick={handleActivateFaker} // 👈 Fonction à définir dans ton composant
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
               >
                  Activer Faker
               </button>
            </div>

            <div className="overflow-x-auto">
               <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-100">
                     <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Nom</th>
                        <th className="py-2 px-4 border-b">Prénom</th>
                        <th className="py-2 px-4 border-b">Sexe</th>
                        <th className="py-2 px-4 border-b">Nationalité</th>
                        <th className="py-2 px-4 border-b">Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {persons.map((person) => (
                        <tr key={person.id} className="hover:bg-gray-50">
                           <td className="py-2 px-4 border-b text-center">
                              {person.id}
                           </td>
                           <td className="py-2 px-4 border-b text-center">
                              {person.nom}
                           </td>
                           <td className="py-2 px-4 border-b text-center">
                              {person.prenom}
                           </td>
                           <td className="py-2 px-4 border-b text-center capitalize">
                              {person.sexe}
                           </td>
                           <td className="py-2 px-4 border-b text-center capitalize">
                              {person.nationalite}
                           </td>
                           <td className="py-2 px-4 border-b text-center">
                              <button
                                 onClick={() => handleDeletePerson(person.id)}
                                 className="text-red-600 hover:text-red-800"
                                 title="Supprimer"
                              >
                                 🗑️
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </>
   );
}

export default App;
