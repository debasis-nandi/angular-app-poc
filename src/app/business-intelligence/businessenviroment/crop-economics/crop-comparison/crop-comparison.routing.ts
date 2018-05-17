
import { Routes, RouterModule } from '@angular/router';

import { CropComparisonComponent } from './crop-comparison.component';

export const cropComparisonRoutes: Routes = [
    { path: '', component: CropComparisonComponent }
];

export const CropComparisonRouting = RouterModule.forChild(cropComparisonRoutes);