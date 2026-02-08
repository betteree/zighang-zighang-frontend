import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("zh_access_token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);
client.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.code === 'ECONNABORTED') {
            console.error("요청 시간이 초과되었습니다.");
        }
        return Promise.reject(error);
    }
);

export default client;
