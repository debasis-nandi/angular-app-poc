
import { Routes, RouterModule } from '@angular/router';

import { AgribusinessOverviewComponent } from './agribusiness-overview.component';

export const agribusinessOverviewRoutes: Routes = [
    { path: '', component: AgribusinessOverviewComponent }
];

export const AgribusinessOverviewRouting = RouterModule.forChild(agribusinessOverviewRoutes);