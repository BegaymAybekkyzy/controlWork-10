import axios from "axios";
import { apiUrl } from './constants.ts';

const axiosAPI = axios.create({
    baseURL: apiUrl,
});

export default axiosAPI;