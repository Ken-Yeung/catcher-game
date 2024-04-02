import RedisController from "../controllers/redis_controller";
import { IRecord } from "../types/record";

class CatcherServiceClass {
  public async getAllFilteredData(key?: string) {
    const result = await RedisController.readData(key);

    console.log(result);

    return result;
  }

  public async upsertData(data: IRecord): Promise<[string | null, IRecord]> {
    const { id, ...remaining } = data;
    // If no id means new record -> Generating new id using timestamp for record
    const dataId = !!!id ? new Date().getTime() : id;
    // Inserting Data
    const resp = await RedisController.setData(
      dataId.toString(),
      JSON.stringify(remaining)
    );
    return [resp, data];
  }
}

const CatcherService = new CatcherServiceClass();

export default CatcherService;
