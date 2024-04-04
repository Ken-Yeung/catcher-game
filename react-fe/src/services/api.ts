import { IRecord } from "../types/record";
import Requests from "../utils/requests";

export default class CatcherAPI extends Requests {
    constructor() {
        super()
        this.instance.defaults.baseURL = `${process.env.REACT_APP_API_ORIGIN}${process.env.REACT_APP_API_V1_BASE}`
    }

    public async getAllRecords(): Promise<IRecord[]> {
        const res = await this.get<IRecord[]>(`/records`);
        if (res.status == 200) {
            return res.data
        } else {
            console.error(`res.status: ${res.status}`)
            console.error(`res.data: ${res.data}`)
            return []
        }
    }
}

export const useCatcherAPI = () => new CatcherAPI()