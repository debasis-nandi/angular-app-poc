
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionComponent } from './subscription.component';

export const subscriptionRoutes: Routes = [
    { path: '', component: SubscriptionComponent }
];

export const SubscriptionRouting = RouterModule.forChild(subscriptionRoutes);