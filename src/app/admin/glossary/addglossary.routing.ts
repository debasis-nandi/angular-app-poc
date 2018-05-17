import { Routes, RouterModule } from '@angular/router';
import { AddGlossaryComponent } from './addglossary.component';

export const addGlossaryRoutes: Routes = [
    { path: '', component: AddGlossaryComponent }
];

export const AddGlossaryRouting = RouterModule.forChild(addGlossaryRoutes);