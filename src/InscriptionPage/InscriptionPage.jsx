import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const InscriptionsPage = () => {
  const [inscriptions, setInscriptions] = useState([]);
  const [sortBy, setSortBy] = useState('asc');
  const [filterDate, setFilterDate] = useState('');
  const [filterFormation, setFilterFormation] = useState('');
  const [filterUtilisateur, setFilterUtilisateur] = useState('');

  useEffect(() => {
    fetchInscriptions();
  }, [filterDate, filterFormation, filterUtilisateur]);
  const fetchInscriptions = () => {
    let url = 'http://192.168.1.34:8082/utilisateurs-inscrits';
    const queryParams = [];

    if (filterDate) {
      queryParams.push(`date=${filterDate}`);
    }

    if (filterFormation) {
      queryParams.push(`formation=${filterFormation}`);
    }

   
    if (filterUtilisateur) {
      queryParams.push(`utilisateur=${filterUtilisateur}`);
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }

    fetch(url)
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
      });
  };

  const toggleSortOrder = () => {
    setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
  };

  const handleDateChange = (value) => {
    setFilterDate(value);
  };

  const handleFormationChange = (value) => {
    setFilterFormation(value);
  };

  const handleUtilisateurChange = (e) => {
    setFilterUtilisateur(e.target.value);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Liste des utilisateurs inscrits à une formation</Text>
      <View style={styles.filterContainer}>
        <Text style={styles.label}>Filtrer apres une certaine date :</Text>
        <TextInput
          style={styles.input}
          value={filterDate}
          onChangeText={handleDateChange}
          placeholder="Date"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.label}>Filtrer par nom de formation :</Text>
        <TextInput
          style={styles.input}
          value={filterFormation}
          onChangeText={handleFormationChange}
          placeholder="Nom de formation"
        />
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.label}>Filtrer par nom d'utilisateur:</Text>
        <TextInput
          style={styles.input}
          value={filterUtilisateur}
          onChangeText={handleUtilisateurChange}
          placeholder="Nom de l'utilisateur"
        />
      </View>
      <Button title="Toggle Sort Order" onPress={toggleSortOrder} />
      <FlatList
  data={inscriptions}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.item}>{item.nom_utilisateur}</Text>
      <Text style={styles.item}>{item.nom_formation}</Text>
      <Text style={styles.item}>{item.dateinscription}</Text>
    </View>
  )}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    borderRadius: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginBottom: 10,
  },
  item: {
    flex: 1,
  },
});

export default InscriptionsPage;
