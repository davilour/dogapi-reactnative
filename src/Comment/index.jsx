import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { CREATE_COMMENT } from '../../graphql/mutations/createComment';
import GET_COMMENTS from '../../graphql/Querys/getComment';
import { API, generateClient } from '@aws-amplify/api';
import { graphqlOperation } from '@aws-amplify/api/dist/esm/types';

const Comment = ({selectedBreed}) => {
    const [comentarios, setComentarios] = useState([]);
    const [novoComentario, setNovoComentario] = useState('');
    const client = generateClient();
    
    const adicionarComentario = async () => {
        try {
            if (!novoComentario.trim()) {
                console.log('O comentário não pode estar vazio.');
                return;
            }
            const novoComentarioObj = {  
                breedId: selectedBreed.id,
                comment: novoComentario 
            };
            const result = await client.graphql(graphqlOperation(CREATE_COMMENT ,novoComentarioObj));
            const novoComentarioCriado = result.data.createComment;
            console.log(result)
            setComentarios([...comentarios, novoComentarioCriado]);
            setNovoComentario('');
        } catch (error) {
            console.log('Erro ao adicionar o comentário ', error)
        }
    }

    const deletarComentario = (id) => {
        const novosComentarios = comentarios.filter(comentario => comentario.id !== id);
        setComentarios(novosComentarios) 
    }

    useEffect(() => {
        const fetchComentarios = async () => {
            try {
                const response = await client.graphql(graphqlOperation(GET_COMMENTS, { breedId: selectedBreed.id }));
                const comments = response.data.listComments.items;
                setComentarios(comments)

                //console.log(comments)
                console.log(response)

            } catch (error) {
                console.error('Erro ao buscar os comentários iniciais', error)
            }
        }
        fetchComentarios();
    }, [selectedBreed]);

    return (
      <View style={{ flex: 1 }}>
          <View style={{ padding: 20 }}>
              <Text style={{ fontSize: 20, marginBottom: 10 }}>Comentários</Text>
              <FlatList
                  data={comentarios}
                  renderItem={({ item }) => (
                      <View style={{ marginBottom: 10 }}>
                          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{item.autor}</Text>
                          <Text>{item.comment}</Text>
                          <Button title="Excluir" onPress={() => deletarComentario(item.id)} />
                      </View>
                  )}
                  keyExtractor={(item) => item.id.toString()}
              />
              <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
                  placeholder="Adicionar comentário..."
                  value={novoComentario}
                  onChangeText={(texto) => setNovoComentario(texto)}
                  maxLength={20}
              />
              <Button title="Adicionar Comentário" onPress={adicionarComentario} />
          </View>
      </View>
  );
  
}

export default Comment;
