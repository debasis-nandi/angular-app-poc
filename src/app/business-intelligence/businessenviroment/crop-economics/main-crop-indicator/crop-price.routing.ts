
import { Routes, RouterModule } from '@angular/router';

import { CropPriceComponent } from './crop-price.component';

export const cropPriceRoutes: Routes = [
    { path: '', component: CropPriceComponent }
];

export const CropPriceRouting = RouterModule.forChild(cropPriceRoutes);