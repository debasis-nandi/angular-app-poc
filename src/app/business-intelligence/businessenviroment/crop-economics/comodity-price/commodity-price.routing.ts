
import { Routes, RouterModule } from '@angular/router';

import { CommodityPriceComponent } from './commodity-price.component';

export const commodityPriceRoutes: Routes = [
    { path: '', component: CommodityPriceComponent }
];

export const CommodityPriceRouting = RouterModule.forChild(commodityPriceRoutes);