import axios from "axios";

const api = async () => {
    const apiBaseUrl = "https://api.thedogapi.com/v1"; // URL base da API
    const apiKey =
        "live_vuENw6b3agMOWIfk5eIvylNeCYLGGhC5rBLUR3P3zD1Lpcg03HWDuO09sLlKLDx0"; //DOG API

    try {
        const response = await axios.get(`${apiBaseUrl}/breeds`, {
            headers: {
                "x-api-key": apiKey,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar as raças de gatos:", error);
        return [];
    }
};

export default api;
