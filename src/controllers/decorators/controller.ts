import "reflect-metadata";

function Controller(routePrefix: string): Function {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    for (let propKey in target.prototype) {
      const routeHandler = target.prototype[propKey];
      const path = Reflect.getMetadata("path", target.prototype, propKey);
    }
  };
}
