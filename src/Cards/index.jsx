import { useState, useCallback, useEffect } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import axios from "axios";

const Cards = ({selectedBreed}) => {  

    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const [isLoadingInfo, setIsLoadingInfo] = useState(false);
    const [dogImage, setDogImage] = useState("");
    const [dogInfo, setDogInfo] = useState("");
    
    const updateDogInfo = useCallback(() => {
        setIsLoadingImage(true);
        setIsLoadingInfo(true);

        axios
            .get(
                `https://api.thedogapi.com/v1/images/${selectedBreed.reference_image_id}`
            )
            .then((imageResponse) => {
                setDogImage(imageResponse.data[0]);
                setIsLoadingImage(false);

                axios
                    .get(
                        `https://api.thedogapi.com/v1/breeds/${selectedBreed.id}`
                    )
                    .then((infoResponse) => {
                        setDogInfo(infoResponse.data);
                        setIsLoadingInfo(false);
                    })
                    .catch((error) => {
                        console.error(
                            "Erro ao buscar informações do dog:",
                            error
                        );
                        setIsLoadingInfo(false);
                    });
            })
            .catch((error) => {
                console.error("Erro ao buscar a imagem do dog:", error);
                setIsLoadingImage(false);
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
            {/* <Image source={{ uri: dogImage.url }} style={{ width: 100, height: 100, marginBottom: 10 }} /> */}
            <Text style={{ fontWeight: "bold" }}>Nome:{dogInfo.name}</Text>
            <Text>Temperamento: {dogInfo.temperament}</Text>
            <Text>Expectativa de Vida: {dogInfo.life_span}</Text>
          </>
        )}
      </View>
    );
};


export default Cards;