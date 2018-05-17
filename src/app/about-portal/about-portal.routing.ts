

import { Routes, RouterModule } from '@angular/router';

import { AboutPortalComponent } from './about-portal.component';

export const aboutPortalRoutes: Routes = [
    { path: '', component: AboutPortalComponent }
];

export const AboutPortalRouting = RouterModule.forChild(aboutPortalRoutes);