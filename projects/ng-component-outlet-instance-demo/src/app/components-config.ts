import { AdminComponent } from "./admin.component";
import { GREETING_TOKEN } from "./greeting.token";
import { IntruderComponent } from "./intruder.component";
import { AdminGreetingService } from "./admin-greeting.service";
import { UserComponent } from "./user.component";
import { Injector } from '@angular/core';

const injector = Injector.create({
  providers: [{
    provide: GREETING_TOKEN, 
    useClass: AdminGreetingService
  }]}
);

export const configs = {
  "admin": { 
    type: AdminComponent,
    permissions: [
      'create',
      'edit',
      'view',
      'delete',
    ],
    injector
  },
  "user": {
    type: UserComponent,
    permissions: ['view'],
    injector
  },
  "intruder": { 
    type: IntruderComponent,
    permissions: [],
    injector
  }
}