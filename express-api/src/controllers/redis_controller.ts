import { createClient } from "redis";
import { Decorator } from "../utils/decorator";

type RedisClient = ReturnType<typeof createClient>;

export class RedisClassController {
  public client: RedisClient;
  private host: string;
  private port: number;
  private user: string;
  private password: string;
  private db: number;
  private connectionUrl: string;

  constructor(private initMsg: string = "Redis Database Connected") {
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

    const msgLine = this.initMsg;
    console.log("-".repeat(msgLine.length + 2));
    console.log(`|${msgLine}|`);
    console.log("-".repeat(msgLine.length + 2));
  }

  // SET Data
  @Decorator.checkConnection
  public async setData(key: string, value: string) {
    return this.client.set(key, value);
  }

  // READ All / By Key
  @Decorator.checkConnection
  public async readData(): Promise<{ key: string; value: string }[]> {
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

  // Pub/Sub
  @Decorator.checkConnection
  public async publish(channel: string, message: string) {
    // Server Use Only -> Require New Client
    await this.client.publish(channel, message);
  }

  @Decorator.checkConnection
  public async subscribe(
    channel: string,
    cb: (message: string, channel: string) => void
  ) {
    // Client Use Only -> New client each new socket collection
    // Remember disconnect every time client disconnected
    await this.client.subscribe(channel, cb);
  }

  // Utils
  public getClient(): RedisClient {
    return this.client;
  }

  public checkIsReady(): boolean {
    return this.client.isReady;
  }
}

const RedisController = new RedisClassController();

export default RedisController;
