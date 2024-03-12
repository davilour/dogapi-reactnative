import { useState, useCallback, useEffect } from "react";
import { View, Text, Image, ActivityIndicator, ScrollView } from "react-native";
import Comment from "../Comment";
import axios from "axios";

const Cards = ({selectedBreed}) => {  

    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const [isLoadingInfo, setIsLoadingInfo] = useState(false);
    const [dogImage, setDogImage] = useState();
    const [dogInfo, setDogInfo] = useState("");
    
    const updateDogInfo = useCallback(() => {
        setIsLoadingImage(true);
        setIsLoadingInfo(true);
    
        axios
            .get(
                `https://api.thedogapi.com/v1/breeds/${selectedBreed.id}`
            )
            .then((response) => {
                const breedData = response.data;
                const referenceImageId = breedData.reference_image_id;
    
                axios
                    .get(
                        `https://api.thedogapi.com/v1/images/${referenceImageId}`
                    )
                    .then((imageResponse) => {
                        const imageUrl = imageResponse.data.url;
                        setDogImage(imageUrl);
                        setIsLoadingImage(false);
                    })
                    .catch((error) => {
                        console.error("Erro ao buscar a imagem do dog:", error);
                        setIsLoadingImage(false);
                    });
    
                setDogInfo(breedData);
                setIsLoadingInfo(false);
            })
            .catch((error) => {
                console.error("Erro ao buscar informações do dog:", error);
                setIsLoadingInfo(false);
            });
    }, [selectedBreed]);
    
    useEffect(() => {
        updateDogInfo();
      }, []);
      
    return(
        <View style={{ margin: 10, padding: 10, borderWidth: 1, borderColor: "gray", borderRadius: 10 }}>
        {isLoadingImage || isLoadingInfo ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <>
            <Image source={{ uri: dogImage }} style={{ width: 100, height: 100, marginBottom: 10, marginLeft:135 }} />
            <Text style={{ fontWeight: "bold" }}>Nome:{dogInfo.name}</Text>
            <Text>Temperamento: {dogInfo.temperament}</Text>
            <Text>Expectativa de Vida: {dogInfo.life_span}</Text>
            <Comment selectedBreed={selectedBreed} initial />
          </>
        )}
      </View>
    );
};


export default Cards;