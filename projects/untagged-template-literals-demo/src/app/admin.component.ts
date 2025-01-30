import { ChangeDetectionStrategy, Component, computed, input, signal } from "@angular/core";
import { Permission } from "./permission.interface";
import { TitleCasePipe } from "@angular/common";

@Component({
  selector: 'app-admin',
  imports: [TitleCasePipe],
  templateUrl: `app-user.component.html`,
  styleUrl: 'app-user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements Permission {
  permissions = input.required<string[]>();
  name = input('N/A');
  type = input.required<string>();

  color = signal('red');

  getGreeting(): string {
    return `I am an ${this.type()} and my name is ${this.name()}.`;
  }
}
