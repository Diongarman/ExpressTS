import "reflect-metadata";
import express from "express";

export const router = express.Router();

export function Controller(routePrefix: string): Function {
  return function (target: any) {
    for (let propKey in target.prototype) {
      const routeHandler = target.prototype[propKey];
      const path = Reflect.getMetadata("path", target.prototype, propKey);

      if (path) {
        router.get(`${routePrefix}${path}`, routeHandler);
      }
    }
  };
}
