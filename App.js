import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import Cards from './src/Select';
//import GlobalStyles from './GlobalStyles';

export default function App() {

  const [selectedBreed, setSelectedBreed] = useState("");

  const handleSelectBreed = (breed) => {
    setSelectedBreed(breed);
    //updateCat();
};

  return (
    <View>
    {/* <Comments/> */}
    <Cards onSelectBreed={handleSelectBreed}/>
    {/* <SelectComponent/> */}
  </View>
  );
}

