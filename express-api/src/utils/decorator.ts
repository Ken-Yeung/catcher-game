export class Decorator {
  static checkConnection(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const isConnected = (this as any).checkIsReady();
      if (!isConnected) {
        console.error("Redis client is not ready.");
        console.error("Reconnecting.");
        (this as any).client.connect();
        console.log("Reconnected...");
      }
      return originalMethod.apply(this, args);
    };

    return descriptor;
  }
}
