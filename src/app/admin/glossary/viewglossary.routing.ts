import { Routes, RouterModule } from '@angular/router';
import { ViewGlossaryComponent } from './viewglossary.component';

export const viewGlossaryRoutes: Routes = [
    { path: '', component: ViewGlossaryComponent }
];

export const ViewGlossaryRouting = RouterModule.forChild(viewGlossaryRoutes);