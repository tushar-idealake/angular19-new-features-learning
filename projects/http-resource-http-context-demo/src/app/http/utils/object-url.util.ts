import { BinaryResponseType } from "../type/response-type.type";

export function createURLFromBinary(responseType: BinaryResponseType, value: unknown | undefined) {
  if (value) {
    return responseType === 'arraybuffer' ?
      URL.createObjectURL(new Blob([value as ArrayBuffer])) : 
      URL.createObjectURL(value as Blob);
  }

  return undefined;
}
