import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart, Bar, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';

import { MaterialCommunityIcons } from '@expo/vector-icons';

function Akeuil() {
  const [userData, setUserData] = useState({});
  const [formationData, setFormationData] = useState({});
  const [inscriptionData, setInscriptionData] = useState({});
  const [utilinscritData, setUtilinscritData] = useState({});
  const [dateInscription, setDateInscription] = useState('');

  useEffect(() => {
    // Requêtes API
    fetch('http://192.168.1.34:8085/nombreutilisateur') // nombre utilisateur
      .then(response => response.json())
      .then(data => setUserData(data[0]));

    fetch('http://192.168.1.34:8085/nombreformation') // nombre formation
      .then(response => response.json())
      .then(data => setFormationData(data[0]));

    fetch('http://192.168.1.34:8085/nombreinscription') // nombre inscription
      .then(response => response.json())
      .then(data => setInscriptionData(data[0]));

    fetch('http://192.168.1.34:8085/utilinscrit') // nombre utilisateur inscris
      .then(response => response.json())
      .then(data => setUtilinscritData(data[0]));
  }, []);

  const chartData = [
    {
      name: 'Utilisateurs',
      utilisateur: userData.count || 0,
      formation: formationData.count || 0,
      inscription: inscriptionData.count || 0,
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.mainTitle}>
        <Text style={styles.titleText}>DASHBOARD</Text>
      </View>

      <View style={styles.mainCards}>
        <View style={styles.card}>
          <View style={styles.cardInner}>
            <Text style={styles.cardText}>Utilisateur</Text>
            <MaterialCommunityIcons name="account-group" style={styles.cardIcon} />
          </View>
          <Text style={styles.cardNumber}>{userData.count}</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardInner}>
            <Text style={styles.cardText}>Formation</Text>
            <MaterialCommunityIcons name="book-open" style={styles.cardIcon} />
          </View>
          <Text style={styles.cardNumber}>{formationData.count}</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardInner}>
            <Text style={styles.cardText}>Inscriptions à une formation</Text>
            <MaterialCommunityIcons name="clipboard-account" style={styles.cardIcon} />
          </View>
          <Text style={styles.cardNumber}>{inscriptionData.count}</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardInner}>
            <Text style={styles.cardText}>Ut. inscrit</Text>
            <MaterialCommunityIcons name="bell" style={styles.cardIcon} />
          </View>
          <Text style={styles.cardNumber}>{utilinscritData.nombre_inscrits}</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardInner}>
            <Text style={styles.cardText}>Date d'inscription</Text>
            <MaterialCommunityIcons name="calendar" style={styles.cardIcon} />
          </View>
          <Text style={styles.cardNumber}>{dateInscription}</Text>
        </View>
      </View>

      <View style={styles.charts}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="utilisateur" fill="#8884d8" />
            <Bar dataKey="formation" fill="#8a9d" />
          </BarChart>
        </ResponsiveContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  mainTitle: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  mainCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '48%',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  cardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginRight: 5,
  },
  cardIcon: {
    fontSize: 20,
    marginRight: 5,
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  charts: {
    flex: 1,
  },
});

export default Akeuil;
