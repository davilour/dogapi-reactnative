import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Login = (navigation) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = ({}) => {
    if (username === 'admin' && password === '123') {
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
      alert('Logado')
      navigation.navigate('App')
    } else {
      alert('Nome de usuário ou senha incorretos.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Faça login</Text>
      <TextInput
        style={{ width: '100%', height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 }}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={{ width: '100%', height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 }}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, width: '100%', alignItems: 'center' }}
        onPress={handleLogin}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Entrar</Text>
      </TouchableOpacity>
      {isLoggedIn && <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold' }}>Você está logado!</Text>}
    </View>
  );
};

export default Login;
