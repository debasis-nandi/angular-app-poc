import { Routes, RouterModule } from '@angular/router';
import { AddNewUserComponent } from './add-new-user.component';
import { AdminComponent } from './admin.component';

export const manageUserRoutes: Routes = [
    { path: '', component: AdminComponent, data: { id: "Manage User", formtype: "adduser" } },

];

export const AddNewUserRouting = RouterModule.forChild(manageUserRoutes);