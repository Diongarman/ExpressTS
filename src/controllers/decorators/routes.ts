import "reflect-metadata";

export function get(path: string) {
  return function (target: any, key: string, desc: PropertyDescriptor): void {
    Reflect.defineMetadata("path", path, target.prototype, key);
  };
}
