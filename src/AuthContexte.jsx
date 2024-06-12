import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
    const checkStoredUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('utilisateur');
        if (storedUser) {
          setUtilisateur(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error retrieving user data from AsyncStorage:', error);
      }
    };

    checkStoredUser();
  }, []);

  const login = (user) => {
    setUtilisateur(user);
    AsyncStorage.setItem('utilisateur', JSON.stringify(user));
  };

  const logout = () => {
    setUtilisateur(null);
    AsyncStorage.removeItem('utilisateur');
  };

  return (
    <AuthContext.Provider value={{ utilisateur, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}