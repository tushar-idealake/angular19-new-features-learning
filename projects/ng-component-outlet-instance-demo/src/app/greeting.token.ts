import { InjectionToken } from "@angular/core";

export const GREETING_TOKEN = new InjectionToken<{ setGreeting: (name: string) => void }>('GREETING_TOKEN');
