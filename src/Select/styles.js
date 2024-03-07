import styled from "styled-components/native";
import { View, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select"


export const Container = styled.View`
    justify-content: flex-start;
    align-items:center;
    background-color: #f0f0f0;
    width: 100%;
    height: 100%;
`;


export const Title = styled.Text`
    font-size:18px;
    color:#000;
    margin-top:30%;
`;

export const StyledPicker = styled(RNPickerSelect)`
    border-color: #000; /* Adicione uma borda preta */
    border-width: 1px; /* Defina a largura da borda */
    
`;

