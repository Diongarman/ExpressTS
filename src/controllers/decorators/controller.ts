import "reflect-metadata";
import { AppRouter } from "./../../AppRouter";
import { Methods } from "./Methods";

export function Controller(routePrefix: string): Function {
  return function (target: any) {
    const router = AppRouter.getInstance();
    for (let propKey in target.prototype) {
      const routeHandler = target.prototype[propKey];
      const path: string = Reflect.getMetadata(
        "path",
        target.prototype,
        propKey
      );
      const method: Methods = Reflect.getMetadata(
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
