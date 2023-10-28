import axios from "axios";


export default axios.create({
    baseURL: "https://leolovenjak00-001-site1.anytempurl.com/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
});