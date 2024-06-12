// Importer useState et useEffect depuis react
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../AuthContexte';

const Profile = () => {
  const { utilisateur } = useAuth();
  const [inscriptions, setInscriptions] = useState([]);
  const [formationsFavorites, setFormationsFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour gérer la désinscription
  const handleDesinscription = (utilisateurId, formationId) => {
    fetch(`http://192.168.1.34:8082/desinscription/${utilisateurId}/${formationId}`, {
      method: 'DELETE'
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Échec de la requête');
      }
      return res.json();
    })
    .then((data) => {
      console.log(data.message); // Afficher le message de réussite ou d'erreur
      // Rafraîchir les inscriptions après la désinscription
      fetchInscriptions();
    })
    .catch((err) => {
      console.error(err);
      setError(err);
    });
  };

  // Fonction pour récupérer les inscriptions de l'utilisateur
  const fetchInscriptions = () => {
    if (utilisateur) {
      fetch(`http://192.168.1.34:8082/inscriptions/${utilisateur.id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Échec de la requête');
          }
          return res.json();
        })
        .then((data) => {
          setInscriptions(data);
        })
        .catch((err) => {
          console.error(err);
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchInscriptions();
  }, [utilisateur]);

  const FormationCard = ({ formation }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{formation.formation}</Text>
      <Text>Date d'inscription : {formation.dateinscription}</Text>
      {/* Ajouter un bouton pour se désinscrire */}
      <TouchableOpacity onPress={() => handleDesinscription(utilisateur.id, formation.id)}>
        <Text style={styles.desinscriptionButton}>Se désinscrire</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.profileContainer}>
      
      <Text style={styles.heading}>Profil Utilisateur</Text>
      {utilisateur && (
        <>
          <Text>Email: {utilisateur.email}</Text>
          <Text>Nom: {utilisateur.nom}</Text>
          <Text>Prénom: {utilisateur.prenom}</Text>

          <Text style={styles.heading}>Formations Inscrites :</Text>
          <FlatList
            data={inscriptions}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2} // Définir le nombre de colonnes à 2
            renderItem={({ item }) => (
              <FormationCard formation={item} />
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  card: {
    width: 200,
    padding: 16,
    margin: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  desinscriptionButton: {
    color: 'red', // Choisir une couleur qui indique la désinscription
    marginTop: 8,
  },
});

export default Profile;
