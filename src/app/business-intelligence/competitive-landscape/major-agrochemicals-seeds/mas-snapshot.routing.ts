

import { Routes, RouterModule } from '@angular/router';

import { MASSnapshotComponent } from './mas-snapshot.component';

export const masSnapshotRoutes: Routes = [
    { path: '', component: MASSnapshotComponent }
];

export const MASSnapshotRouting = RouterModule.forChild(masSnapshotRoutes);