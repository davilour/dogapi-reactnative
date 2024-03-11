import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { useState, useEffect } from 'react';


const Comment = () => {
    const [comentarios, setComentarios] = useState([]);
    const [novoComentario, setNovoComentario] = useState('');

    const adicionarComentario = () => {
        const novoId = comentarios.length + 1;
        const novoComentarioObj = { 
          id: novoId, 
          autor: 'Você', 
          texto: novoComentario 
        };
        setComentarios([...comentarios, novoComentarioObj]);
        setNovoComentario('');
      };


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
          value={novoComentario}
          onChangeText={(texto) => setNovoComentario(texto)}
        />
        <Button title="Adicionar Comentário" onPress={adicionarComentario} />
      </View>

    )

}

export default Comment