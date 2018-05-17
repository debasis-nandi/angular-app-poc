
import { Routes, RouterModule } from '@angular/router';

import { MyPageComponent  } from './mypage.component';

export const myPageRoutes: Routes = [
    { path: '', component: MyPageComponent }
];

export const MyPageRouting = RouterModule.forChild(myPageRoutes);