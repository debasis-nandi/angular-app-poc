
import { Routes, RouterModule } from '@angular/router';

import { MajorAgrochemicalsSeedsComponent } from './major.agrochemicals-seeds.component';

export const majorAgroRoutes: Routes = [
    { path: '', component: MajorAgrochemicalsSeedsComponent }
];

export const MajorAgroRouting = RouterModule.forChild(majorAgroRoutes);