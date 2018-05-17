import { Routes, RouterModule } from '@angular/router';

import { MASNewsComponent } from './mas-news.component';

export const masNewsRoutes: Routes = [
    { path: '', component: MASNewsComponent }
];

export const MASNewsRouting = RouterModule.forChild(masNewsRoutes);