import "reflect-metadata";
import { AppRouter } from "./../../AppRouter";
import { Methods } from "./Methods";
import { MetadataKeys } from "./MetadataKeys";

//Wires up handlers to router
export function Controller(routePrefix: string) {
  return function (target: Function) {
    //console.log("from controller:", target);
    const router = AppRouter.getInstance();
    for (let key in target.prototype) {
      //collect all metadata: path, method, middlewares
      const routeHandler = target.prototype[key];

      //console.log("from COntroller", routeHandler);
      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );
      console.log(path);
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );

      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];

      //wireup metadata to router object
      if (path) {
        router[method](`${routePrefix}${path}`, ...middlewares, routeHandler);
      }
    }
  };
}
