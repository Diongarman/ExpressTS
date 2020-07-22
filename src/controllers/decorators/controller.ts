import "reflect-metadata";
import { AppRouter } from "./../../AppRouter";
import { Methods } from "./Methods";
import { MetadataKeys } from "./MetadataKeys";

export function Controller(routePrefix: string): Function {
  return function (target: any) {
    const router = AppRouter.getInstance();
    for (let propKey in target.prototype) {
      const routeHandler = target.prototype[propKey];
      const path: string = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        propKey
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        propKey
      );

      if (path) {
        router[method](`${routePrefix}${path}`, routeHandler);
      }
    }
  };
}
