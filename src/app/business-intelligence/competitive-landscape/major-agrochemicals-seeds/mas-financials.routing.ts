
import { Routes, RouterModule } from '@angular/router';

import { MASFinancialsComponent } from './mas-financials.component';

export const masFinancialsRoutes: Routes = [
    { path: '', component: MASFinancialsComponent }
];

export const MASFinancialsRouting = RouterModule.forChild(masFinancialsRoutes);