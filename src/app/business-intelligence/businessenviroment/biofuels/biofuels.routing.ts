
import { Routes, RouterModule } from '@angular/router';

import { BiofuelsComponent } from './biofuels.component';

export const biofuelsComponentRoutes: Routes = [
    { path: '', component: BiofuelsComponent }
];

export const BiofuelsRouting = RouterModule.forChild(biofuelsComponentRoutes);