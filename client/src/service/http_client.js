import axios from "axios";

const API_DEV = "http://localhost:5000/api/";
const API_PRODUCT = "https://holaworld-api.com/api/";
const baseURL = process.env.NODE_ENV === "development" ? API_DEV : API_PRODUCT;
const httpClient = axios.create({
  baseURL,
  withCredentials:true,
});
export default httpClient;
