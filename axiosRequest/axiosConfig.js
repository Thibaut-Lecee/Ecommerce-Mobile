import axios from "axios";
import {API_URL} from "@env"

export const instanceAxios = axios.create({
    baseURL: `${API_URL}`,
    headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
    }
});

instanceAxios.interceptors.response.use(
    (response) => {
        return response;
    }, (error) => {
        console.error(error, "error", error.response);
        return Promise.reject(error);
    }
);

export default instanceAxios;