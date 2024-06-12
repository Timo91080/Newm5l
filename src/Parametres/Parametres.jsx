import React, { useState } from 'react';
import { View, Text, useColorScheme, Switch } from 'react-native';

const Parametres = () => {
  const systemTheme = useColorScheme();
  const [userPrefersDarkTheme, setUserPrefersDarkTheme] = useState(systemTheme === 'dark');

  const toggleTheme = () => {
    setUserPrefersDarkTheme((previousTheme) => !previousTheme);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: userPrefersDarkTheme ? 'black' : 'white',
      }}>
      <Text style={{ color: userPrefersDarkTheme ? 'white' : 'black' }}>
        This is a demo of default dark/light theme using appearance.
      </Text>
      <Switch
        value={userPrefersDarkTheme}
        onValueChange={toggleTheme}
        style={{ marginTop: 20 }}
      />
      <Text style={{ color: userPrefersDarkTheme ? 'white' : 'black', marginTop: 10 }}>
        {`Mode sombre: ${userPrefersDarkTheme ? 'Activé' : 'Désactivé'}`}
      </Text>
    </View>
  );
};

export default Parametres;
