import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { signal } from '@angular/core';
import { finalize } from 'rxjs';
import chalk from 'chalk';

export const elapsed = signal(0);

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const startTime = performance.now();
  return next(req).pipe(
    finalize(() => {
      const endTime = performance.now();
      elapsed.set(endTime - startTime);
      console.log(chalk.blue.bgYellowBright.underline(`Round trip time is ${elapsed()} milliseconds.`));
    })
  );
}