import { HttpHandlerFn, HttpRequest } from "@angular/common/http";

export function requestInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const method = req.method || 'GET';

  // GET method does not have body
  if (method && req.body) {
    return next(req.clone({ body: null }));
  } else {
    return next(req);
  }
}