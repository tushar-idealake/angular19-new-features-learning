import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { GREETING_TOKEN } from './greeting.token';
import { Permission } from './permission.interface';

@Component({
  selector: 'app-user',
  templateUrl: `app.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements Permission {
  type = input.required<string>();
  permissions = input.required<string[]>();
  name = input('N/A');
  service = inject(GREETING_TOKEN);

  getGreeting(): string {
    return `I am a ${this.type()} and my name is ${this.name()}.`;
  }

  constructor() {
    effect(() => this.service.setGreeting(`Hello ${this.name()}.`));
  }
}
