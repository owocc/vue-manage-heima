import axios from "axios";
export const request = axios.create({
    baseURL:'http://43.142.192.144:8888/api/private/v1',
    timeout:5000,
})
export default request