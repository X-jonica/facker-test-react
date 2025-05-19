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

   useEffect(() => {
      getPersonnes();
   }, []);

   if (loading) return <div className="p-4 text-center">Chargement...</div>;
   if (error) return <div className="p-4 text-red-500">Erreur: {error}</div>;

   return (
      <>
         <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Liste des Personnes</h1>

            <div className="overflow-x-auto">
               <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-100">
                     <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Nom</th>
                        <th className="py-2 px-4 border-b">Prénom</th>
                        <th className="py-2 px-4 border-b">Sexe</th>
                        <th className="py-2 px-4 border-b">Nationalité</th>
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
