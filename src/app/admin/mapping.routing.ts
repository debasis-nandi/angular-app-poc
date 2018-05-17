import { Routes, RouterModule } from '@angular/router';

import { MappingComponent } from './mapping.component';
import { AdminComponent } from './admin.component';

export const mappingRoutes: Routes = [
    { path: '', component: MappingComponent },
    { path: 'competitorsegment', component: AdminComponent, data: { id: "Competitor Segment Mapping", formtype: "mapping" } },
    { path: 'competitorProductLine', component: AdminComponent, data: { id: "Competitor Product Line Mapping", formtype: "mapping" } },
    { path: 'competitorregion', component: AdminComponent, data: { id: "Competitor Region Mapping", formtype: "mapping" } },
    { path: 'moduledocumenttype', component: AdminComponent, data: { id: "Module Document Type Mapping", formtype: "mapping" } }
];

export const MappingRouting = RouterModule.forChild(mappingRoutes);