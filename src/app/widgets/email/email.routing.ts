
import { Routes, RouterModule } from '@angular/router';

import { EmailComponent } from './email.component';

export const emailRoutes: Routes = [
    { path: '', component: EmailComponent }
];

export const EmailRouting = RouterModule.forChild(emailRoutes);