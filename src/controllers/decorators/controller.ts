import "reflect-metadata";
import { AppRouter } from "./../../AppRouter";

export function Controller(routePrefix: string): Function {
  return function (target: any) {
    const router = AppRouter.getInstance();
    for (let propKey in target.prototype) {
      const routeHandler = target.prototype[propKey];
      const path = Reflect.getMetadata("path", target.prototype, propKey);
      const method: string = Reflect.getMetadata(
        "method",
        target.prototype,
        propKey
      );

      if (path) {
        router[method](`${routePrefix}${path}`, routeHandler);
      }
    }
  };
}
