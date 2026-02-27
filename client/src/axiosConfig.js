import axios from "axios";

axios.defaults.baseURL = "https://ligand-dev-7.onrender.com";
axios.defaults.withCredentials = true;

export default axios;