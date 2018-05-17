
import { Routes, RouterModule } from '@angular/router';

import { CurrencyBasketComponent } from './currency-basket.component';

export const currencyBasketRoutes: Routes = [
    { path: '', component: CurrencyBasketComponent }
];

export const CurrencyBasketRouting = RouterModule.forChild(currencyBasketRoutes);