
import { Routes, RouterModule } from '@angular/router';

import { UserAnalyticsComponent } from './useranalytics.component';

export const userAnalyticsRoutes: Routes = [
    { path: '', component: UserAnalyticsComponent }
];

export const UserAnalyticsRouting = RouterModule.forChild(userAnalyticsRoutes);