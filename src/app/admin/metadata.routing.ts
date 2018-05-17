import { Routes, RouterModule } from '@angular/router';

import { MetadataComponent } from './metadata.component';
import { AdminComponent } from './admin.component';

export const metadataRoutes: Routes = [
    { path: '', component: MetadataComponent },
    { path: 'segment', component: AdminComponent, data: { id: "Segment", formtype: "master" } },
    { path: 'region', component: AdminComponent, data: { id: "Region", formtype: "master" } },
    { path: 'productLines', component: AdminComponent, data: { id: "Product line", formtype: "master" } },
    { path: 'crop', component: AdminComponent, data: { id: "Crop", formtype: "master" } },
    { path: 'documenttype', component: AdminComponent, data: { id: "Document Type", formtype: "master" } },
    { path: 'newstype', component: AdminComponent, data: { id: "News Type", formtype: "master" } },
    { path: 'currencies', component: AdminComponent, data: { id: "Currencies", formtype: "master" } },
    { path: 'competitor', component: AdminComponent, data: { id: "Competitor", formtype: "master" } },
    { path: 'restrictedgroup', component: AdminComponent, data: { id: "Restricted Group", formtype: "master" } }
];

export const MetaDataRouting = RouterModule.forChild(metadataRoutes);