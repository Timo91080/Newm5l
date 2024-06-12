import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Modal, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const Utili = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recherche, setRecherche] = useState('');
  const [utilisateursFiltres, setUtilisateursFiltres] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [updateNom, setUpdateNom] = useState('');
  const [updatePrenom, setUpdatePrenom] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [updateDatedenaissance, setUpdateDatedenaissance] = useState('');
  const [userToUpdate, setUserToUpdate] = useState(null);

  const effectuerRecherche = (texteRecherche) => {
    const utilisateursFiltres = utilisateurs.filter((utilisateur) =>
      utilisateur.nom.toLowerCase().includes(texteRecherche.toLowerCase())
    );
    setUtilisateursFiltres(utilisateursFiltres);
  };

  const handleRechercheChange = (texteRecherche) => {
    setRecherche(texteRecherche);
    if (texteRecherche === '') {
      setUtilisateursFiltres(utilisateurs);
    } else {
      effectuerRecherche(texteRecherche);
    }
  };

  const handleUpdate = (id) => {
    axios.put(`http://192.168.1.34:8085/updateutilisateur/${id}`, {
      nom: updateNom,
      prenom: updatePrenom,
      email: updateEmail,
      ddn: updateDatedenaissance,
    })
    .then(response => {
      if (response.status === 200) {
        console.log('Utilisateur mis à jour avec succès');
        Alert.alert('Mise à jour réussie');
        setUserToUpdate(null);
        closeModal2();
        fetchUtilisateurs(); // Actualiser la liste des utilisateurs après la mise à jour
      } else {
        console.error('Échec de la mise à jour de l\'utilisateur');
        Alert.alert('Échec de la mise à jour');
      }
    })
    .catch(error => {
      console.error('Erreur lors de la requête:', error);
    });
  };

  const openModal2 = (utilisateur) => {
    setUserToUpdate(utilisateur);
    setUpdateNom(utilisateur.nom);
    setUpdatePrenom(utilisateur.prenom);
    setUpdateEmail(utilisateur.email);
    setUpdateDatedenaissance(utilisateur.ddn);
    setIsModalOpen2(true);
  };

  const closeModal2 = () => {
    setUserToUpdate(null);
    setIsModalOpen2(false);
  };

  const handlePop = async (supputilid) => {
    try {
      const response = await fetch(`http://192.168.1.34:8085/supputilisateur/${supputilid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('Suppression réussie');
        Alert.alert('Suppression réussie');
        fetchUtilisateurs(); // Actualiser la liste des utilisateurs après suppression
      } else {
        console.error('Échec de la suppression');
        Alert.alert('Échec de la suppression');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression', error);
    }
  };

  const openModal = (utilisateur) => {
    setUserToUpdate(utilisateur);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setUserToUpdate(null);
    setIsModalOpen(false);
  };

  const fetchUtilisateurs = () => {
    fetch('http://192.168.1.34:8085/utilisateur')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Échec de la requête');
        }
        return res.json();
      })
      .then((data) => {
        setUtilisateurs(data);
        setUtilisateursFiltres(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  if (isLoading) {
    return <Text>Chargement en cours...</Text>;
  }

  if (error) {
    return <Text>Une erreur s'est produite lors du chargement des données.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Utilisateurs</Text>
      <TextInput
        style={styles.input}
        placeholder="Recherche..."
        value={recherche}
        onChangeText={handleRechercheChange}
      />

      {utilisateursFiltres.length === 0 && <Text>Aucun utilisateur trouvé.</Text>}

      <FlatList
        data={utilisateursFiltres}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.utilisateurCard}>
            <Text style={styles.name}>{item.nom}</Text>
            <Text>{item.prenom}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Supprimer" onPress={() => openModal(item)} />
              <Button title="Modifier" onPress={() => openModal2(item)} />
            </View>
          </View>
        )}
      />

      <Modal
        visible={isModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Voulez-vous vraiment supprimer cet utilisateur?</Text>
            <View style={styles.modalButtons}>
              <Button title="Oui" onPress={() => handlePop(userToUpdate?.id)} />
              <Button title="Non" onPress={closeModal} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isModalOpen2}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal2}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Modifier l'utilisateur</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom"
              value={updateNom}
              onChangeText={setUpdateNom}
            />
            <TextInput
              style={styles.input}
              placeholder="Prénom"
              value={updatePrenom}
              onChangeText={setUpdatePrenom}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={updateEmail}
              onChangeText={setUpdateEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Date de naissance"
              value={updateDatedenaissance}
              onChangeText={setUpdateDatedenaissance}
            />
            <Button title="Modifier l'utilisateur" onPress={() => handleUpdate(userToUpdate?.id)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  utilisateurCard: {
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Utili;