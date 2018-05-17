
import { Routes, RouterModule } from '@angular/router';

import { EconomicIndicatorsComponent } from './economic-indicators.component';

export const economicIndicatorsRoutes: Routes = [
    { path: '', component: EconomicIndicatorsComponent }
];

export const EconomicIndicatorsRouting = RouterModule.forChild(economicIndicatorsRoutes);