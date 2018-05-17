import { Routes, RouterModule } from '@angular/router';

import { BridgeToMyPageComponent } from '../BridgeToMyPage/BridgeToMyPage.component';

export const loginRoutes: Routes = [
    { path: '', component: BridgeToMyPageComponent }
];

export const BridgeToMyPageRouting = RouterModule.forChild(loginRoutes);