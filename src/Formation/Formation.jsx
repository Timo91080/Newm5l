import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../AuthContexte';
import { useNavigation } from '@react-navigation/native'; // Import de useNavigation depuis @react-navigation/native

const Formation = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recherche, setRecherche] = useState('');
  const [formationFiltre, setFormationFiltre] = useState([]);
  const navigation = useNavigation(); // Utilisation de useNavigation

  const { utilisateur } = useAuth();

  const effectuerRecherche = (texteRecherche) => {
    const formationFiltre = data.filter((item) =>
      item.nom.toLowerCase().includes(texteRecherche.toLowerCase())
    );
    setFormationFiltre(formationFiltre);
  };

  const handleRechercheChange = (texteRecherche) => {
    setRecherche(texteRecherche);
    if (texteRecherche === '') {
      setFormationFiltre(data);
    } else {
      effectuerRecherche(texteRecherche);
    }
  };

  useEffect(() => {
    // Utilisez une bibliothèque pour effectuer des requêtes HTTP (ex: axios, fetch)
    // et assurez-vous d'autoriser les requêtes depuis votre serveur dans l'émulateur ou sur un appareil réel
    // Exemple avec fetch :
    fetch('http://192.168.1.34:8082/formations')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Échec de la requête');
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
        setFormationFiltre(data);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setIsLoading(false);
      });
  }, []);

  const handleInscription = async (formationId) => {
    try {
      const response = await fetch('http://192.168.1.34:8082/inscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formation: formationId,
          utilisateur: utilisateur.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Échec de la requête d\'inscription');
      }

      console.log('Inscription réussie!');
      
      // Rediriger l'utilisateur vers la page de formation
      navigation.navigate('Formation');
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
    }
  };

  const handleFavoris = async (formationId) => {
    try {
      const response = await fetch('http://192.168.1.34:8088/favoris', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formation: formationId,
          utilisateur: utilisateur.id,
        }),
      });

      if (!response.ok) {
        console.error('Échec de la requête d\'ajout aux favoris', response.status);
        throw new Error('Échec de la requête d\'ajout aux favoris');
      }

      const data = await response.json();
      console.log('Ajout aux favoris réussi!', data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout aux favoris :', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formations</Text>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Recherche"
          value={recherche}
          onChangeText={handleRechercheChange}
        />
      </View>

      {formationFiltre.length === 0 && <Text>Aucune formation trouvée.</Text>}

      <FlatList
        data={formationFiltre}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.formationCard}>
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.formationName}>{item.nom}</Text>
                <Text style={styles.dateAndPlace}>{item.date} - {item.lieu}</Text>
                <TouchableOpacity
                  onPress={() => console.log(`Voir les détails de la formation ${item.id}`)}
                >
                  <Text style={styles.detailsLink}>Voir les détails</Text>
                </TouchableOpacity>
                <Button
                  title="Inscrire"
                  onPress={() => handleInscription(item.id)}
                  style={styles.buttonContainer}
                />
              </View>
              <TouchableOpacity style={styles.starIconContainer}>
                <MaterialCommunityIcons
                  onPress={() => handleFavoris(item.id)}
                  name="star"
                  color="red"
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchBar: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
  formationCard: {
    marginBottom: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 3, // Ombre sur Android
    shadowColor: 'rgba(0, 0, 0, 0.1)', // Couleur de l'ombre sur iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  dateAndPlace: {
    color: '#666',
    marginBottom: 8,
  },
  detailsLink: {
    color: '#3498db',
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 8,
    backgroundColor: '#3498db',
    borderRadius: 5,
    padding: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  starIconContainer: {
    marginLeft: 8,
  },
});

export default Formation;
