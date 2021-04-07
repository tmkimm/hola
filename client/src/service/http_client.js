import axios from "axios";

const API_DEV = "http://localhost:3000/api/";
const API_PRODUCT = "";
let baseURL = process.env.NODE_ENV === "development" ? API_DEV : API_PRODUCT;

const httpClient = axios.create({
  baseURL,
});

export default httpClient;
