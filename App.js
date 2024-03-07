import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import Cards from './src/Cards';
import Select from './src/Select';
import axios from 'axios';


export default function App() {

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
  if (initialBreeds) {
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
    <ScrollView>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" , marginTop:90}}>
      <Text style={{fontSize:20, }}>Selecione a raça de um cachorro 🐶</Text>
      <Select onSelectBreed={handleSelectBreed} />
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {selectedBreed ? (
          <Cards key={selectedBreed.id} selectedBreed={selectedBreed} />
        ) : (
          initialBreeds.map((breed) => (
            <Cards key={breed.id} selectedBreed={breed} />
          ))
        )}
      </View>
    </View>
    </ScrollView>
  );
}

