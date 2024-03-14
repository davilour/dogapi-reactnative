import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    if (username === '' && password === '') {
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
      alert('Bem-vindo!')
      navigation.navigate('Principal');
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

    </View>
    
  );
};

export default Login;
