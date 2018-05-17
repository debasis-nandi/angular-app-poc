import { Routes, RouterModule } from '@angular/router';

import { MASCompetitorReportsComponent } from './mas-competitorreports.component';

export const masCompetitorReportRoutes: Routes = [
    { path: '', component: MASCompetitorReportsComponent }
];

export const MASCompetitorReportRouting = RouterModule.forChild(masCompetitorReportRoutes);