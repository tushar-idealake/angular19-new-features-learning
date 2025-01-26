import { UserFormComponent } from "./user-form.component";
import { ChangeDetectionStrategy, Component, computed, signal, VERSION, viewChild } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { configs } from "./components-config";

@Component({
  selector: 'app-root',
  imports: [NgComponentOutlet, UserFormComponent],
  template: `
    <h1>Version {{ version }} - {{ description }}</h1>
    <p>Choose a user type</p>
    <app-user-form [(userType)]="userType" [(userName)]="userName"  />
    @let ct = componentType();
    <ng-container [ngComponentOutlet]="ct.type" 
      [ngComponentOutletInputs]="inputs()" 
      [ngComponentOutletInjector]="ct.injector"  
      #instance="ngComponentOutlet"
    />
    @let componentInstance = instance?.componentInstance;
    <p>Greeting from componentInstance: {{ componentInstance?.getGreeting() }}</p>
    <p>Greeting from componentInstance's injector: {{ componentInstance?.service.greeting() }}</p>
    <!-- <p>Greeting from viewChild (not working): {{ greeting() }}</p> -->
    <button (click)="concatPermissions()">Permission String</button>

    @let unit = permissionsString().numPermissions > 1 ? 'permissions' : 'permission';
    hello: {{ permissionsString().numPermissions }} {{ unit }}, {{ permissionsString().str }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  description = 'NgComponentOutlet ComponentInstance';
  version = VERSION.full;

  userName = signal('N/A');
  userType = signal<"user" | "admin" | "intruder">('user');

  componentType = computed(() => configs[this.userType()]);
  inputs = computed(() => ({
    permissions: this.componentType().permissions,
    name: this.userName(),
    type: `${this.userType().charAt(0).toLocaleUpperCase()}${this.userType().slice(1)}`
  }));

  outlet = viewChild.required(NgComponentOutlet);
  permissionsString = signal({
    numPermissions: 0,
    str: '',
  });

  concatPermissions() {
    const permissions = this.outlet().componentInstance?.permissions() as string[];
    this.permissionsString.set({ 
      numPermissions: permissions.length, 
      str: permissions.join(',')
    });
  }

  // greeting = computed(() => {
  //   console.log('componentInstance', this.outlet()?.componentInstance);
  //   return this.outlet()?.componentInstance?.getGreeting() || 'Hello';
  // });
}
