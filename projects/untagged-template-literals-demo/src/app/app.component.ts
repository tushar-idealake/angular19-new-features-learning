import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal, VERSION } from '@angular/core';
import { UserFormComponent } from './user-form.component';
import { configs } from './components-config';

@Component({
  selector: 'app-root',
  imports: [NgComponentOutlet, UserFormComponent],
  templateUrl: `./main.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  // Credit: https://www.linkedin.com/feed/update/urn:li:activity:7289095895512498176/

  description = `${VERSION.full} - Untagged Template Literals`;

  userName = signal('N/A');
  userType = signal<"user" | "admin" | "intruder">('user');

  componentType = computed(() => configs[this.userType()]);
  inputs = computed(() => ({
    permissions: this.componentType().permissions,
    name: this.userName(),
    type: this.userType(),
  }));
}
