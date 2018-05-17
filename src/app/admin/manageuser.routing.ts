import { Routes, RouterModule } from '@angular/router';

import { ManageUserAuthorizationComponent } from './manage-user-authorization.component';
import { AdminComponent } from './admin.component';

export const manageUserRoutes: Routes = [
    { path: '', component: AdminComponent, data: { id: "Manage User", formtype: "manageuser" } },

];

export const ManageUserRouting = RouterModule.forChild(manageUserRoutes);