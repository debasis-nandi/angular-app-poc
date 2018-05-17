
import { Routes, RouterModule } from '@angular/router';

import { MASFinancialsRatioComponent } from './mas-financials-ratio.component';

export const masFinancialsRatioRoutes: Routes = [
    { path: '', component: MASFinancialsRatioComponent }
];

export const MASFinancialsRatioRouting = RouterModule.forChild(masFinancialsRatioRoutes);