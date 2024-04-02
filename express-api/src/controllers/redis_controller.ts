import { createClient } from "redis";

type RedisClient = ReturnType<typeof createClient>;

class RedisClassController {
  private client: RedisClient;
  private host: string;
  private port: number;
  private user: string;
  private password: string;
  private db: number;
  private connectionUrl: string;

  constructor() {
    this.host = process.env.REDIS_HOST ?? "127.0.0.1";
    this.port = parseInt(process.env.REDIS_PORT ?? "6379");
    this.user = process.env.REDIS_USER ?? "admin";
    this.password = process.env.REDIS_PW!;
    this.db = parseInt(process.env.REDIS_DB ?? "0");

    this.connectionUrl = `redis://${this.user}:${this.password}@${this.host}:${this.port}`;

    this.client = createClient({ url: this.connectionUrl, database: this.db });

    this.client.on("error", (error) =>
      console.error(`Redis Database Error : ${error}`)
    );

    this.client.connect();

    const msgLine = "Redis Database Connected";
    console.log("-".repeat(msgLine.length + 2));
    console.log(`|${msgLine}|`);
    console.log("-".repeat(msgLine.length + 2));
  }

  // SET Data
  public async setData(key: string, value: string) {
    return this.client.set(key, value);
  }

  // READ All / By Key
  public async readData(
    key?: string
  ): Promise<{ key: string; value: string }[]> {
    if (!!key) {
      // Reading Data by Key
      const result = await this.client.get(key);
      if (!!result) return [{ key: key, value: result }];
      return [];
    } else {
      // Reading All Data
      const allKeys = await this.client.keys("*");
      const result = await Promise.all(
        allKeys.map(async (_) => {
          const foundOne = await this.client.get(_);
          return { key: _, value: foundOne! };
        })
      );
      return result;
    }
  }

  // Utils
  public getClient(): RedisClient {
    return this.client;
  }

  public checkIsReady(): boolean {
    return this.client.isReady;
  }

  // Events
}

const RedisController = new RedisClassController();

export default RedisController;
