import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { CREATE_COMMENT } from '../../graphql/mutations/createComment';
import { API, generateClient } from '@aws-amplify/api';
import { graphqlOperation } from '@aws-amplify/api/dist/esm/types';


const Comment = ({selectedBreed}) => {
    const [comentarios, setComentarios] = useState([]);
    const [novoComentario, setNovoComentario] = useState('');

    const client = generateClient();
    
    const adicionarComentario = async () => {
      try{

        if (!novoComentario.trim()) {
          console.log('O comentário não pode estar vazio.');
          return;
        }

        const novoComentarioObj = {  
          breedId: selectedBreed.id,
          //autor: 'Você', 
          comment: novoComentario 
        };

        console.log(novoComentarioObj.comment)
        const result = await client.graphql(graphqlOperation(CREATE_COMMENT, novoComentarioObj ));
        const novoComentarioCriado = result.data.createComment;
        console.log(novoComentarioCriado)

        setComentarios([...comentarios, novoComentarioCriado]);
        setNovoComentario('');
      } catch (error) {
        console.log('Erro ao adicionar o comentario ', error)
      }

    }

    const deletarComentario = (id) => {
      const novosComentarios = comentarios.filter(comentarios => comentarios.id !== id);
      setComentarios(novosComentarios) 
    }


    return (
        <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Comentários</Text>
        <FlatList
          data={comentarios}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.autor}</Text>
              <Text>{item.texto}</Text>
              <Button title="Excluir" onPress={() => deletarComentario(item.id)}/>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
          placeholder="Adicionar comentário..."
          value={comentarios}
          onChangeText={() => setNovoComentario(comentarios)}
        />
        <Button title="Adicionar Comentário" onPress={() => adicionarComentario(selectedBreed)} />
      </View>

    )

}

export default Comment