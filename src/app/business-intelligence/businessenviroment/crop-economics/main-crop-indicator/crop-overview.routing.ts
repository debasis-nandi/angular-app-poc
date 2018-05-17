
import { Routes, RouterModule } from '@angular/router';

import { CropOverviewComponent } from './crop-overview.component';

export const cropOverviewRoutes: Routes = [
    { path: '', component: CropOverviewComponent }
];

export const CropOverviewRouting = RouterModule.forChild(cropOverviewRoutes);