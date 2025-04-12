import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { signal } from '@angular/core';
import { finalize } from 'rxjs';

export const elapsed = signal(0);

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const startTime = Date.now();
  return next(req).pipe(
    finalize(() => {
      const endTime = Date.now();
      elapsed.set(endTime - startTime);
      console.log(`Round trip time is ${elapsed()} milliseconds.`);
    })
  );
}