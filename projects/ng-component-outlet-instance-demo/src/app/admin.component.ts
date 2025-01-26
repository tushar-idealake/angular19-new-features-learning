import { ChangeDetectionStrategy, Component, effect, inject, input } from "@angular/core";
import { GREETING_TOKEN } from "./greeting.token";
import { Permission } from "./permission.interface";

@Component({
  selector: 'app-admin',
  templateUrl: `app.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements Permission {
  permissions = input.required<string[]>();
  name = input('N/A');
  type = input.required<string>();
  service = inject(GREETING_TOKEN);

  getGreeting(): string {
    return `I am an ${this.type()} and my name is ${this.name()}.`;
  }

  constructor() {
    effect(() => this.service.setGreeting(`Hello ${this.name()}, you have all the power.`));
  }
}
