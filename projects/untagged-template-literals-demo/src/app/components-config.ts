import { AdminComponent } from "./admin.component";
import { IntruderComponent } from "./intruder.component";
import { UserComponent } from "./user.component";

export const configs = {
  "admin": { 
    type: AdminComponent,
    permissions: [
      'create',
      'edit',
      'view',
      'delete',
    ],
  },
  "user": {
    type: UserComponent,
    permissions: ['view'],
  },
  "intruder": { 
    type: IntruderComponent,
    permissions: [],
  }
}