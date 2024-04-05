import { RedisClassController } from "../controllers/redis_controller";

export class Decorator {
  static checkConnection(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const _this = this as RedisClassController;
      const isConnected = _this.checkIsReady();
      if (!isConnected) {
        console.error("Redis client is not ready.");
        console.error("Reconnecting.");
        _this.client.connect();
        console.log("Reconnected...");
      }
      return originalMethod.apply(_this, args);
    };

    return descriptor;
  }
}
