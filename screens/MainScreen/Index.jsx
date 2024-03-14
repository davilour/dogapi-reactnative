import { Text, View, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import Cards from '../../src/Cards';
import Select from '../../src/Select';
import axios from 'axios';

// Tela principal dos dog
const MainScreen = () => {
  const [selectedBreed, setSelectedBreed] = useState("");
  const [initialBreeds, setInitialBreeds] = useState([]);

  const handleSelectBreed = (breed) => {
    setSelectedBreed(breed);
    updateDog();
  };

  const updateDog = (breed) => {
    if (breed && breed.id) {
      axios
        .get(`https://api.thedogapi.com/v1/breeds/${breed.id}`)
        .then((response) => {
          setSelectedBreed(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar a imagem do dog:", error);
        });
    }
  };

 

  useEffect(() => {
    if (initialBreeds.length === 0) {
      axios
        .get("https://api.thedogapi.com/v1/breeds")
        .then((response) => {
          // Pega 10 raças aleatórias
          const randomBreeds = getRandomBreeds(response.data, 10);
          setInitialBreeds(randomBreeds);
        })
        .catch((error) => {
          console.error("Erro ao buscar raças iniciais:", error);
        });
    }
  }, []);

  const getRandomBreeds = (breeds, count) => {
    const shuffledBreeds = breeds.sort(() => Math.random() - Math.random());
    return shuffledBreeds.slice(0, count)
  };

 

  return (  
    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 90 }}>
      <Text style={{ fontSize: 20 }}>Selecione a raça de um cachorro 🐶</Text>
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', width: '100%', marginTop: 15 }}></View>
      <Select onSelectBreed={handleSelectBreed} />
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', width: '100%', marginBottom: 10 }}></View>
      <FlatList
        data={selectedBreed ? [selectedBreed] : initialBreeds}
        renderItem={({ item }) => (
          <Cards key={item.id} selectedBreed={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

export default MainScreen;