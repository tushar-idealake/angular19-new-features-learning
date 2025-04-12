import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { loggingInterceptor  } from './interceptors/logging.interceptor';
import { requestInterceptor } from './interceptors/request.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [    
    provideExperimentalZonelessChangeDetection(), 
    provideHttpClient(
      withInterceptors([loggingInterceptor, requestInterceptor])
    ),
  ]
};
