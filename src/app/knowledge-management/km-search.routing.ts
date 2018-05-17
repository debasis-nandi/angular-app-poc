
import { Routes, RouterModule } from '@angular/router';

import { KmSearchComponent } from './km-search.component';

export const kmSearchRoutes: Routes = [
    { path: '', component: KmSearchComponent }
];

export const KmSearchRouting = RouterModule.forChild(kmSearchRoutes);

