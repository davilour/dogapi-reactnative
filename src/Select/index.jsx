import { Container, Title, StyledPicker } from "./styles";
import RNPickerSelect from "react-native-picker-select"
import { useState, useEffect } from "react";
import axios from "axios";

const Select = ({ onSelectBreed }) => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(""); 

  useEffect(() => {
    updateBreeds();
  }, []);

  const updateBreeds = () => {
    axios
      .get(`https://api.thedogapi.com/v1/breeds`)
      .then((response) => {
        setBreeds(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar as raças de dogos:", error);
      });
  };

  const handleSelectChange = (value) => {
    const selectedBreed = breeds.find((breed) => breed.id == value);
    setSelectedBreed(value); 
    onSelectBreed(selectedBreed);
  };

  const pickerItems = breeds.map((breed) => ({
    value: breed.id,
    label: breed.name + "",
  }));

  return (
    <Container>
      {/* <Title>Selecione a raça de um cachorro 🐶</Title> */}
      {pickerItems && (
        <RNPickerSelect 
          onValueChange={handleSelectChange}
          items={pickerItems}
          placeholder={{ label: "Dog 🐶", value: undefined }}
          value={selectedBreed}
          key={pickerItems.id}
        />
      )}
    </Container>
  );
};

export default Select;
