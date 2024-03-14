
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import Login from './screens/Login';
import MainScreen from './screens/MainScreen/Index';
import { Amplify } from 'aws-amplify';
import config from './services/amplifyconfiguration.json'

Amplify.configure(config);
const Stack = createStackNavigator();

export default function App () {
  return (  
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Principal" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}