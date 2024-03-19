import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [showConfirmationCodeInput, setShowConfirmationCodeInput] = useState(false);

  async function handleRegister() {
    try {
      await Auth.signUp({
        username,
        password,
      });
      setShowConfirmationCodeInput(true);
    } catch (error) {
      console.log('error signing up', error);
      alert('Erro ao registrar. Verifique os detalhes fornecidos.');
    }
  }

  async function handleConfirmationCode() {
    try {
      const ConfirmRegister = await Auth.confirmSignUp(username, confirmationCode);
        alert('Registro confirmado com sucesso!');
        navigation.navigate('Login')
    } catch (error) {
      console.log('error confirming sign up', error);
      alert('Código de verificação inválido. Por favor, tente novamente.');
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Registrar</Text>
      <TextInput
        style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="E-mail"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Registrar" onPress={handleRegister} />
      
      {showConfirmationCodeInput && (
        <>
          <TextInput
            style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginBottom: 10, paddingHorizontal: 10, marginTop:10 }}
            placeholder="Código de Verificação"
            value={confirmationCode}
            onChangeText={setConfirmationCode}
          />
          <Button title="Confirmar" onPress={handleConfirmationCode} />
        </>
      )}
    </View>
  );
};

export default Register;
