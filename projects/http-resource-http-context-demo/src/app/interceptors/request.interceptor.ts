import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { RESPONSE_TYPE } from "../http/http-context-token.constant";

export function requestInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const reqClone = req.context.has(RESPONSE_TYPE) ? 
    req.clone({ responseType: req.context.get(RESPONSE_TYPE) }) :
    req;

  return next(reqClone);
}
