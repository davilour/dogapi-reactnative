import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { API, generateClient } from '@aws-amplify/api';
import { graphqlOperation } from '@aws-amplify/api/dist/esm/types';

import { DELETE_COMMENT } from '../../graphql/mutations/deleteComment';
import { CREATE_COMMENT } from '../../graphql/mutations/createComment';
import { UPDATE_COMMENT } from '../../graphql/mutations/updateComment';
import GET_COMMENTS from '../../graphql/Querys/getComment';


const Comment = ({selectedBreed}) => {
    const [comentarios, setComentarios] = useState([]);
    const [novoComentario, setNovoComentario] = useState('');
    const [comentarioEditado, setcomentarioEditado] = useState()
    const client = generateClient();
    
    const adicionarComentario = async () => {
        
        try {
            if (!novoComentario.trim()) {
                alert('O comentário não pode estar vazio.');
                return;
            }

            if(comentarioEditado){
            const input = {id: comentarioEditado.id, comment: novoComentario}
            const update = await client.graphql(graphqlOperation(UPDATE_COMMENT, input))
            console.log('Comentario Atualizado com sucesso!')
                
            const updatedComentarios = comentarios.map(comment => {
                if (comment.id === comentarioEditado.id) {
                    return { ...comment, comment: novoComentario };
                }
                return comment;
            });
            setComentarios(updatedComentarios);


            } else {
                    const novoComentarioObj = {  
                        breedId: selectedBreed.id,
                        comment: novoComentario 
                    };
            const result = await client.graphql(graphqlOperation(CREATE_COMMENT ,novoComentarioObj));
            const novoComentarioCriado = result.data.createComment;
            setComentarios([...comentarios, novoComentarioCriado]);
            setNovoComentario('');
            }
        }
        catch (error) {
        console.log('Erro ao adicionar/atualizar o comentário ', error)
        }

    }

    const deletarComentario = async (selectedBreed) => {
        try{
            const input = {id: selectedBreed.id}
            const result = await client.graphql(graphqlOperation(DELETE_COMMENT, input))
            alert("Comentario Excluido")
            const novosComentarios = comentarios.filter(comment => comment.id !== selectedBreed.id);
            setComentarios(novosComentarios);
            return;
        } catch(error){
            console.log("Não foi possivel apagar seu comentario", error)
            throw error
        }
    }
    
    const updateComment = async (comment) =>{
        setcomentarioEditado(comment);
        setNovoComentario(comment.comment)
    }

    useEffect(() => {
        const fetchComentarios = async () => {
            try {
                const response = await client.graphql(graphqlOperation(GET_COMMENTS, { breedId: selectedBreed.id }));
                const comments = response.data.listComments.items;
                setComentarios(comments)

            } catch (error) {
                console.error('Erro ao buscar os comentários', error)
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
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <TouchableOpacity
                                    onPress={() => deletarComentario(item)}
                                    style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }}
                                >
                                    <Text style={{ color: 'white' }}>Excluir</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => updateComment(item)}
                                    style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
                                >
                                    <Text style={{ color: 'white' }}>{comentarioEditado ? 'Atualizar' : 'Adicionar'}</Text>
                                </TouchableOpacity>
                            </View>
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
                <TouchableOpacity
                    style={{ backgroundColor: 'green', padding: 10, borderRadius: 5, alignSelf: 'flex-start' }}
                    onPress={adicionarComentario}
                >
                    <Text style={{ color: 'white' }}>{comentarioEditado ? 'Atualizar Comentário' : 'Adicionar Comentário'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
                    
}



export default Comment;
