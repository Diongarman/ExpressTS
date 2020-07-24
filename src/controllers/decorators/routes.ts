import "reflect-metadata";
import { RequestHandler } from "express";
import { Methods } from "./Methods";
import { MetadataKeys } from "./MetadataKeys";

interface RequestHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

//routes are bound to handlers
function routeBinder(method: string) {
  return function (path: string) {
    return function (
      target: any,
      key: string,
      desc: RequestHandlerDescriptor
    ): void {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  };
}

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
export const patch = routeBinder(Methods.patch);
export const put = routeBinder(Methods.put);
export const del = routeBinder(Methods.del);
