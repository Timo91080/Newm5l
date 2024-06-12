import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './Home';
import Form from '../Form/Form';
import Formation from '../Formation/Formation';
import Profile from '../Profile/Profile';
import Parametres from '../Parametres/Parametres';
import Login from '../Login/Login';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ top: -30, justifyContent: 'center', alignItems: 'center', ...styles.shadow }}>
    <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#9837A0', justifyContent: 'center', alignItems: 'center' }}>
      {children}
    </View>
  </TouchableOpacity>
);

const Accueil = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#FFFFFF',
          borderRadius: 15,
          height: 90,
          alignSelf: 'center',
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Acceuil"
        component={Home}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="stadium-variant" color="#E21A8D" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Formation"
        component={Formation}
        options={{
          tabBarLabel: 'Formation',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="school" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton {...props}>
              <MaterialCommunityIcons name="account" color="#000" size={26} />
            </CustomTabBarButton>
          ),
        }}
      />
      <Tab.Screen
        name="Parametres"
        component={Parametres}
        options={{
          tabBarLabel: 'Parametres',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cogs" color="#975D7F" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Form"
        component={Form}
        options={{
          tabBarLabel: 'Parametres',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-settings" color="#975D7F" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Accueil;
