import axios, { AxiosInstance, AxiosResponse } from "axios";

export default class Requests {
    public instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: process.env.REACT_APP_API_ORIGIN
        });
    }

    public async get<T>(path: string): Promise<AxiosResponse<T>> {
        return await this.instance.get(path)
    }

    public async post<T>(path: string, data: any): Promise<AxiosResponse<T>> {
        return await this.instance.post(path, data, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
    }

}

export const useRequests = () => new Requests()