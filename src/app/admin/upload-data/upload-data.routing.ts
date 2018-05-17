
import { Routes, RouterModule } from '@angular/router';

import { UploadDataComponent } from './upload-data.component';

export const uploadDataRoutes: Routes = [
    { path: '', component: UploadDataComponent }
];

export const UploadDataRouting = RouterModule.forChild(uploadDataRoutes);

