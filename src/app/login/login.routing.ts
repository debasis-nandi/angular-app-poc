import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';

export const loginRoutes: Routes = [
    { path: '', component: LoginComponent }
];

export const LoginRouting = RouterModule.forChild(loginRoutes);