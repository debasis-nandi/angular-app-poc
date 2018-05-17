

import { Routes, RouterModule } from '@angular/router';

import { AboutTeamComponent } from './about-team.component';

export const aboutTeamRoutes: Routes = [
    { path: '', component: AboutTeamComponent }
];

export const AboutTeamRouting = RouterModule.forChild(aboutTeamRoutes);