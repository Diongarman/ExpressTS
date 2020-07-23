import "reflect-metadata";
import { RequestHandler } from "express";
import { MetadataKeys } from "./MetadataKeys";

export function use(middleware: RequestHandler) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    //Get previous middleware from metadata

    const middlewares =
      Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];

    //add new middleware

    //console.log("from use", [...middlewares, middleware]);

    Reflect.defineMetadata(
      MetadataKeys.middleware,
      [...middlewares, middleware],
      target,
      key
    );
  };
}
