
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import Login from './screens/Login';
import MainScreen from './screens/MainScreen/Index';
import Register from './screens/Registrer/index.jsx';
import config from './services/aws-exports.js'
import { Amplify, Auth } from 'aws-amplify';
import ForgotPassword from './screens/ForgotPassword/index.jsx';

Amplify.configure(config);
Auth.configure(config);
const Stack = createStackNavigator();

export default function App () {
  return (  
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Principal" component={MainScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

