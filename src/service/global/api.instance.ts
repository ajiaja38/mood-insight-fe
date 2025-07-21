import type { AxiosInstance } from "axios"
import axios from "axios"

export const api: AxiosInstance = axios.create({
  baseURL: "https://mood-insight-be.vercel.app/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
)
