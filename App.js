import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/AuthContexte';
import Login from './src/Login/Login';
import Accueil from './src/Accueil/Accueil';
import Formation from './src/Formation/Formation';
import Enregistrer from './src/Enregistrer/Enregistrer';
import PreAcceuil from './src/Accueil/PreAcceuil';
import LAdmin from './src/LAdmin/LAdmin';
import AAdmin from './src/AAdmin/AAdmin';
import Aformation from './src/Aformation/Aformation';
import Utili from './src/Utili/Utili';
import InscriptionsPage from './src/InscriptionPage/InscriptionPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
      <Stack.Navigator initialRouteName="PreAcceuil">
        <Stack.Screen name="PreAcceuil" component={PreAcceuil} />
        <Stack.Screen name="Enregistrer" component={Enregistrer} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="LAdmin" component={LAdmin} />
          <Stack.Screen name="Accueil" component={Accueil} />
          
        
          <Stack.Screen name="AAdmin" component={AAdmin} options={{ headerShown: false }} />
      
          <Stack.Screen name="Formation" component={Formation} />
          <Stack.Screen name="Aformation" component={Aformation} />
          <Stack.Screen name="Utili" component={Utili} />
          <Stack.Screen name="InscriptionPage" component={InscriptionsPage} />
     
          
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
