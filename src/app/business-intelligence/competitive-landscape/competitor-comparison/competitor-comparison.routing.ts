
import { Routes, RouterModule } from '@angular/router';

import { CompetitorComparisonComponent } from './competitor.comparison.component';

export const competitorComparisonRoutes: Routes = [
    { path: '', component: CompetitorComparisonComponent }
];

export const CompetitorComparisonRouting = RouterModule.forChild(competitorComparisonRoutes);