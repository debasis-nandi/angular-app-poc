import { Routes, RouterModule } from '@angular/router';
import { AuthoriseComponent } from './authorise.component';

export const authoriseRoutes: Routes = [
    { path: '', component: AuthoriseComponent }
];

export const AuthoriseRouting = RouterModule.forChild(authoriseRoutes);