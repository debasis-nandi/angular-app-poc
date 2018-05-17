
import { Routes, RouterModule } from '@angular/router';

import { MainCropIndicatorComponent } from './main-crop-indicator.component';

export const majorAgroRoutes: Routes = [
    { path: '', component: MainCropIndicatorComponent }
];

export const MainCropIndicatorRouting = RouterModule.forChild(majorAgroRoutes);