import React, {useState} from "react";
import { Auth } from "aws-amplify";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";


const ForgotPassword = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [showResetForm, setShowResetForm] = useState(false);
    const [verificationCode, setVerificationCode] = useState('')
    

    async function ResetPassword () {
        try{
            const reset = await Auth.forgotPassword(email)
            ForgotPassword(reset)
        }
        catch (error){
            console.log(error)
        }
        setShowResetForm(true);
    } 

    async function forgotPasswordSubmit() {
        try {
            const data = await Auth.forgotPasswordSubmit(email, verificationCode, newPassword);
            console.log(data);
            alert("Senha alterada com sucesso!")
            navigation.navigate('Login')
        } 
        catch (error) {
          console.log(error);
          alert("Código inválido!")
        }
      }

    const handleGoBack = () => {
        navigation.navigate('Login')
    };

      return (
        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 60 }}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#007AFF' }}>Voltar</Text>
                     </TouchableOpacity>
            </View>         
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Esqueci minha Senha</Text>


          {!showResetForm ? (
            <>
              <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 20 }}>Por favor, insira seu e-mail para redefinir sua senha.</Text>
              <TextInput
                style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 20 }}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={{ backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 }}
                onPress={ResetPassword}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>Enviar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput
                style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 20 }}
                placeholder="Código de Verificação"
                value={verificationCode}
                onChangeText={setVerificationCode}
              />
              <TextInput
                style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 20 }}
                placeholder="Nova Senha"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
              />
              <TouchableOpacity
                style={{ backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 }}
                onPress={forgotPasswordSubmit}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>Redefinir Senha</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      );
}


export default ForgotPassword;