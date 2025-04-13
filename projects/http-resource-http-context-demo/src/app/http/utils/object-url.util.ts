import { BinaryResponseType } from "../type/response-type.type";

export function createURLFromBinary(responseType: BinaryResponseType, value: unknown | undefined) {
  if (value) {
    const data = responseType === 'blob' ?
      value as Blob : 
      new Blob([value as ArrayBuffer]);

    return URL.createObjectURL(data);
  }

  return undefined;
}
