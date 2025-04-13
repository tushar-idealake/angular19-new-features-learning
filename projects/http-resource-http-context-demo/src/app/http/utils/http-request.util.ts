import { HttpContext } from "@angular/common/http";
import { RESPONSE_TYPE } from "../http-context-token.constant";
import { BinaryResponseType } from "../type/response-type.type";

export function makeHttpRequest(url: string, responseType: BinaryResponseType) {
  const defaultOptions = { 
    url,
    reportProgress: true,
    method: 'GET',
  };

  return responseType ? { 
    ...defaultOptions,  
    context: new HttpContext().set(RESPONSE_TYPE, responseType),
  } : defaultOptions;
}
