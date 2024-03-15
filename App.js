
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import Login from './screens/Login';
import MainScreen from './screens/MainScreen/Index';
import config from './services/aws-exports.js'
import { Amplify } from 'aws-amplify';

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