import { provideExperimentalZonelessChangeDetection } from '@angular/core';

export const appConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection()
  ]
}