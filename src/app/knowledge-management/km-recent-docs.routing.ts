
import { Routes, RouterModule } from '@angular/router';

import { KmRecentDocsComponent } from './km-recent-docs.component';

export const kmRecentDocsRoutes: Routes = [
    { path: '', component: KmRecentDocsComponent }
];

export const KmRecentDocsRouting = RouterModule.forChild(kmRecentDocsRoutes);

