import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Aformation from '../Aformation/Aformation';
import Utili from '../Utili/Utili';
import InscriptionsPage from '../InscriptionPage/InscriptionPage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AAdmin = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="AdminTabs"
          component={AdminTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Logout"
          component={LogoutScreen}
          options={({ navigation }) => ({
            title: 'Déconnexion',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.canGoBack() && navigation.goBack()}>
                <MaterialCommunityIcons name="arrow-left" size={30} color="#000" style={{ marginLeft: 10 }} />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AdminTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="AAdmin"
        component={AAdminScreen}
        options={({ navigation }) => ({
          tabBarLabel: 'Accueil Admin',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: true,
          headerTitle: 'Accueil Admin',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.canGoBack() && navigation.goBack()}>
              <MaterialCommunityIcons name="arrow-left" size={30} color="#000" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="Aformation"
        component={Aformation}
        options={({ navigation }) => ({
          tabBarLabel: 'Formation',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book" color={color} size={size} />
          ),
          headerShown: true,
          headerTitle: 'Formation',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.canGoBack() && navigation.goBack()}>
              <MaterialCommunityIcons name="arrow-left" size={30} color="#000" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="Utili"
        component={Utili}
        options={({ navigation }) => ({
          tabBarLabel: 'Utilisateur',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
          headerShown: true,
          headerTitle: 'Utilisateur',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.canGoBack() && navigation.goBack()}>
              <MaterialCommunityIcons name="arrow-left" size={30} color="#000" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="InscriptionPage"
        component={InscriptionsPage}
        options={({ navigation }) => ({
          tabBarLabel: 'Nombre InscritFormation',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
          headerShown: true,
          headerTitle: 'Nombre InscritFormation',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.canGoBack() && navigation.goBack()}>
              <MaterialCommunityIcons name="arrow-left" size={30} color="#000" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const AAdminScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenue à l'Accueil Admin</Text>
    </View>
  );
};

const LogoutScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Ajoutez votre logique de déconnexion ici, comme vider le token d'authentification, etc.
    // Une fois déconnecté, redirigez l'utilisateur vers la page d'accueil en remplaçant la pile de navigation
    navigation.replace('Akeuil');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Vous êtes déconnecté.</Text>
      <Button title="Retour à l'accueil" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AAdmin;
