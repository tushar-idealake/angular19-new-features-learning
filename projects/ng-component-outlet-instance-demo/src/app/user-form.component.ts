import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
    imports: [FormsModule],
  template: `
    @let choices = ['Admin', 'User', 'Intruder'];
    
    @for (c of choices; track c) {
      @let value = c.toLowerCase();
      <div>
        <input type="radio" [id]="value" 
          [name]="value" [value]="value" 
          [(ngModel)]="userType" />
        <label for="admin">{{ c }}</label>
      </div>
    }
    Name: <input [(ngModel)]="userName" />
  `,
  styles: `
    input {
      margin-right: 0.5rem;
    }  
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  userType = model.required<string>();
  userName = model.required<string>();
}