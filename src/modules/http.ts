import axios from "axios";

export const http = (token?: string | undefined) => {
    return axios.create({
        baseURL: "http://localhost:3000/api",
        timeout: 10000,
        withCredentials: true,
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
}