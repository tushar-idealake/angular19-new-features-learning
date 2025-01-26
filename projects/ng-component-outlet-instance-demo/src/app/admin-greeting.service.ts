import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminGreetingService {
  greeting = signal('');

  setGreeting(msg: string) {
    this.greeting.set(msg);
  }
}