import { createClient } from 'redis';

type RedisClient = ReturnType<typeof createClient>;

class RedisController {
 private client: RedisClient;

 constructor(private host: string = '127.0.0.1', private port: number = 6379, private password: string, private db: number = 0) {
    this.client = createClient({
      host: this.host,
      port: this.port,
      password: this.password,
      db: this.db
    });

    this.client.on('error', (error) => {
      console.error(`Redis client error: ${error}`);
    });

    this.client.on('connect', () => {
      console.log(`Connected to Redis at ${this.host}:${this.port}`);
    });
 }

 public switchDatabase(db: number): void {
    this.client.select(db, (err) => {
      if (err) {
        console.error(`Failed to switch to database ${db}: ${err}`);
      } else {
        console.log(`Switched to database ${db}`);
      }
    });
 }

 public getClient(): RedisClient {
    return this.client;
 }
}

export default RedisController;
