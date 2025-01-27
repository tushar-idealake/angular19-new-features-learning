import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { Permission } from "./permission.interface";
import { TitleCasePipe } from "@angular/common";

@Component({
  selector: 'app-admin',
  templateUrl: `app-user.component.html`,
  imports: [TitleCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements Permission {
  permissions = input.required<string[]>();
  name = input('N/A');
  type = input.required<string>();

  getGreeting(): string {
    return `I am an ${this.type()} and my name is ${this.name()}.`;
  }
}
