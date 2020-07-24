import "reflect-metadata";
import { Request, Response, RequestHandler, NextFunction } from "express";
import { AppRouter } from "./../../AppRouter";
import { Methods } from "./Methods";
import { MetadataKeys } from "./MetadataKeys";

function bodyValidators(validators: string[]): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send("Invalid request");
      return;
    }
    console.log(req.body);
    for (let validator of validators) {
      if (!req.body[validator]) {
        res.status(422).send(`Missing property: ${validator}`);
        return;
      }
    }

    next();
  };
}

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

      const requiredBodyValidators =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        [];

      const validators = bodyValidators(requiredBodyValidators) || [];

      //wireup metadata to router object
      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validators,
          routeHandler
        );
      }
    }
  };
}
