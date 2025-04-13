import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { RESPONSE_TYPE } from "../http/http-context-token.constant";

export function requestInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const responseType = req.context.get(RESPONSE_TYPE);
    
  if (responseType !== '') {
    const reqCloned = req.clone({ responseType });
    return next(reqCloned);
  }

  return next(req);
}
