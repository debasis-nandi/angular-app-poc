﻿
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search.component';

export const searchRoutes: Routes = [
    { path: '', component: SearchComponent }
];

export const SearchRouting = RouterModule.forChild(searchRoutes);