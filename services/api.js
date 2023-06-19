import axios from "axios";

export function getApiClient() {

    const token = "40fe071962846075452a4f6123ae71697463cad20f51e237e2035b41af0513d8"
    const baseURL = "https://sys-dev.searchandstay.com/api/admin/house_rules/"

    const apiClient = axios.create({ baseURL });

    if (token) {

        apiClient.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        });
    }

    return apiClient
}

export default getApiClient;