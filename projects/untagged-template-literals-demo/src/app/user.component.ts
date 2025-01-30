import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Permission } from './permission.interface';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [TitleCasePipe],
  templateUrl: `app-user.component.html`,
  styleUrl: 'app-user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements Permission {
  type = input.required<string>();
  permissions = input.required<string[]>();
  name = input('N/A');

  color = signal('rebeccaPurple');

  getGreeting(): string {
    return `I am a ${this.type()} and my name is ${this.name()}.`;
  }
}
