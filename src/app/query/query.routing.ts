
import { Routes, RouterModule } from '@angular/router';

import { QueryComponent } from './query.component';

export const queryRoutes: Routes = [
    { path: '', component: QueryComponent }
];

export const QueryRouting = RouterModule.forChild(queryRoutes);