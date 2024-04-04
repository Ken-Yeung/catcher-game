import RedisController from "../controllers/redis_controller";
import { IRecord } from "../types/record";
import { generateUniqueId } from "../utils/gen_pw";

class CatcherServiceClass {
  private async getSortedData(key?: string): Promise<IRecord[]> {
    const result = await RedisController.readData(key);

    // Transform Data
    const response = result
      .map((_) => {
        const _res = JSON.parse(_.value) as Omit<IRecord, "id">;
        return {
          id: parseInt(_.key),
          name: _res.name,
          score: parseFloat(_res.score.toString()),
        };
      })
      .sort((a, b) => b.score - a.score) // Implement Sorts: Desc

    return response
  }

  public async getAllFilteredData(key?: string): Promise<IRecord[]> {
    const sortedData = await this.getSortedData(key)

    // Check is filter by key
    if (!!key) {
      let rank: number;
      sortedData.filter((_, _index) => {
        const isValid = _.id == parseInt(key)

        if (isValid) {
          rank = _index + 1
        }

        return isValid
      }); // Using Filter instead of find for transform data shape later
      return sortedData.map((_) => {
        return {
          ..._,
          rank: rank
        }
      })
    }

    return sortedData.splice(0, 100); // Implement Limit: 100
  }

  public async upsertData(data: IRecord): Promise<[string | null, IRecord]> {
    const { id, ...remaining } = data;
    // If no id means new record -> Generating new id using timestamp for record
    const generatedID = generateUniqueId();
    const dataId = !!!id ? generatedID : id;
    // Inserting Data
    const resp = await RedisController.setData(
      dataId.toString(),
      JSON.stringify(remaining)
    );

    return [resp, { ...data, id: parseInt(dataId.toString()) }];
  }
}

const CatcherService = new CatcherServiceClass();

export default CatcherService;
