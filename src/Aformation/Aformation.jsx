import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';

const Aformation = () => {
  const [formations, setFormations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recherche, setRecherche] = useState('');
  const [formationsFiltrees, setFormationsFiltrees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateNom, setUpdateNom] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [formationToUpdate, setFormationToUpdate] = useState(null);

  useEffect(() => {
    fetch('http://192.168.1.34:8085/formation')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Échec de la requête');
        }
        return res.json();
      })
      .then((data) => {
        setFormations(data);
        setFormationsFiltrees(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setIsLoading(false);
      });
  }, []);

  const effectuerRecherche = (texteRecherche) => {
    const filteredFormations = formations.filter((formation) =>
      formation.nom.toLowerCase().includes(texteRecherche.toLowerCase())
    );
    setFormationsFiltrees(filteredFormations);
  };

  const handleRechercheChange = (texteRecherche) => {
    setRecherche(texteRecherche);
    if (texteRecherche === '') {
      setFormationsFiltrees(formations);
    } else {
      effectuerRecherche(texteRecherche);
    }
  };

  const handleUpdate = (id) => {
    fetch('http://192.168.1.34:8085/updateformation/${id}', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nom: updateNom,
        description: updateDescription,
      }),
    })
      .then((response) => {
        if (response.ok) {
          Alert.alert('Mise à jour réussie');
          setFormationToUpdate(null);
          setIsModalOpen(false);
          return response.json();
        } else {
          throw new Error('Échec de la mise à jour');
        }
      })
      .then(() => {
        // Re-fetch the data to update the state
        fetch('http://192.168.1.34:8085/formation')
          .then((res) => res.json())
          .then((data) => {
            setFormations(data);
            setFormationsFiltrees(data);
          });
      })
      .catch((error) => {
        Alert.alert('Erreur lors de la requête:', error.message);
      });
  };

  const handlePop = (formationId) => {
    fetch('http://192.168.1.34:8085/deleteformation/${formationId}', {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          Alert.alert('Suppression réussie');
          setFormations(formations.filter((formation) => formation.id !== formationId));
          setFormationsFiltrees(formationsFiltrees.filter((formation) => formation.id !== formationId));
        } else {
          throw new Error('Échec de la suppression');
        }
      })
      .catch((error) => {
        Alert.alert('Erreur lors de la suppression', error.message);
      });
  };

  if (isLoading) {
    return <Text>Chargement en cours...</Text>;
  }

  if (error) {
    return <Text>Une erreur s'est produite lors du chargement des données.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Formations</Text>
      <TextInput
        style={styles.input}
        placeholder="Recherche"
        value={recherche}
        onChangeText={handleRechercheChange}
      />
      {formationsFiltrees.length === 0 && <Text>Aucune formation trouvée.</Text>}
      <FlatList
        data={formationsFiltrees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.formationCard}>
            <Text style={styles.formationName}>{item.nom}</Text>
            <Text>{item.description}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Supprimer" onPress={() => handlePop(item.id)} />
              <Button title="Modifier" onPress={() => {
                setFormationToUpdate(item);
                setUpdateNom(item.nom);
                setUpdateDescription(item.description);
                setIsModalOpen(true);
              }} />
            </View>
          </View>
        )}
      />
      <Modal
        visible={isModalOpen}
        animationType="slide"
        onRequestClose={() => setIsModalOpen(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Modifier la formation</Text>
          <TextInput
            style={styles.input}
            placeholder="Titre"
            value={updateNom}
            onChangeText={setUpdateNom}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={updateDescription}
            onChangeText={setUpdateDescription}
          />
          <Button
            title="Modifier la formation"
            onPress={() => handleUpdate(formationToUpdate?.id)}
          />
          <Button title="Fermer" onPress={() => setIsModalOpen(false)} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  formationCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  formationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalContent: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Aformation;

