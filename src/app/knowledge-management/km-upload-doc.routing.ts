
import { Routes, RouterModule } from '@angular/router';

import { KmUploadDocComponent } from './km-upload-doc.component';

export const kmUploadDocRoutes: Routes = [
    { path: '', component: KmUploadDocComponent }
];

export const KmUploadDocRouting = RouterModule.forChild(kmUploadDocRoutes);

