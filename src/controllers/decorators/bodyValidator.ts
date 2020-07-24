import "reflect-metadata";
import { MetadataKeys } from "./MetadataKeys";

export function bodyValidator(...validators: string[]) {
  return function (target: any, key: string, desc: PropertyDescriptor): void {
    Reflect.defineMetadata(MetadataKeys.validator, validators, target, key);
  };
}
