import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, KeyboardAvoidingView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContexte';
const Enregistrer = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [ddn, setDdn] = useState('');
  const [message, setMessage] = useState('');

  const navigation = useNavigation();

  const handleInscription = async () => {
    try {
      const response = await axios.post('http://192.168.1.34:3003/register', {
        nom,
        prenom,
        email,
        password: motDePasse,
        ddn,
      }, { timeout: 5000 });

      setMessage(response.data.message);

      if (response.status === 200) {
        navigation.navigate('Login'); // Rediriger vers la page de connexion après l'inscription
      }
    } catch (error) {
      setMessage('Erreur lors de l\'inscription');
      console.error(error);
    }
  };

  const image = require('../style/appmobilefond.jpg');

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.innerContainer}>
            <MaterialCommunityIcons
              style={styles.icon}
              name="account-plus"
              color="white"
              size={100}
            />

            <TextInput
              style={styles.input}
              placeholder="Nom"
              value={nom}
              onChangeText={(text) => setNom(text)}
              placeholderTextColor="white"
            />

            <TextInput
              style={styles.input}
              placeholder="Prénom"
              value={prenom}
              onChangeText={(text) => setPrenom(text)}
              placeholderTextColor="white"
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor="white"
            />

            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              secureTextEntry
              value={motDePasse}
              onChangeText={(text) => setMotDePasse(text)}
              placeholderTextColor="white"
            />

            <TextInput
              style={styles.input}
              placeholder="Date de naissance"
              value={ddn}
              onChangeText={(text) => setDdn(text)}
              placeholderTextColor="white"
            />

            <TouchableOpacity style={styles.button} onPress={handleInscription}>
              <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>

            <Text style={styles.message}>{message}</Text>
          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  innerContainer: {
    alignItems: 'center',
    padding: 20,
  },

  icon: {
    marginBottom: 20,
  },

  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },

  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 3,
    marginBottom: 16,
    padding: 10,
    width: 300,
    color: 'white',
    borderRadius: 8,
  },

  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: 200,
    alignItems: 'center',
  },

  buttonText: {
    color: '#E21A8D',
    fontSize: 18,
    fontWeight: 'bold',
  },

  message: {
    color: 'white',
    marginTop: 10,
  },
});

export default Enregistrer;
