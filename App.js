
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import Login from './screens/Login';
import MainScreen from './screens/MainScreen/Index';
import Register from './screens/Registrer/index.jsx';
import config from './services/aws-exports.js'
import { Amplify } from 'aws-amplify';
import Constants from 'expo-constants';

const apiUrl = Constants.manifest.env.API;


Amplify.configure(config);
const Stack = createStackNavigator();

export default function App () {
  return (  
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Principal" component={MainScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}