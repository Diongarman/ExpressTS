import "reflect-metadata";

function routeBinder(method: string) {
  return function (path: string) {
    return function (target: any, key: string, desc: PropertyDescriptor): void {
      Reflect.defineMetadata("path", path, target, key);
      Reflect.defineMetadata("method", method, target, key);
    };
  };
}

export const get = routeBinder("get");
export const post = routeBinder("post");
export const patch = routeBinder("patch");
export const put = routeBinder("put");
export const del = routeBinder("del");
