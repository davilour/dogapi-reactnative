import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify'; 
//import { signUp, signIn } from '@aws-amplify/auth';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  async function handleLogin() {
    try {
    const user = await Auth.signIn(
      username,
      password,
    );
      console.log(user)
      navigation.navigate('Principal')
    } catch (error) {
      console.log('error signing in', error);
      alert('Nome de usuário ou senha incorretos.');
      console.log('Tentando fazer login com:', username, password);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Faça login</Text>
      <TextInput
        style={{ width: '100%', height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 }}
        placeholder="Nome de Usuário"
        value={username}
        onChangeText={setUsername}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ flex: 1, height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 }}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          
        />
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text>{showPassword ? <Entypo name="eye-with-line" size={24} color="black" /> : <AntDesign name="eye" size={24} color="black" />}</Text>
        </TouchableOpacity>
      </View>
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
