import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://invoice-app-fullstack.herokuapp.com/",
});
