import { Routes } from "@angular/router";
import { roleGuard } from "../../core/guards/role.guard";

export const PRODUCTS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./list/products-list.page').then(m => m.ProductsListPage)
    },
    {
        path: 'new',
        loadComponent: () => import('./form/products-form.page').then(m => m.ProductsFormPage),
        //canActivate: [roleGuard('Admin')],
            
    },
    {
        path: ':id/edit',
        loadComponent: () => import('./form/products-form.page').then(m => m.ProductsFormPage),
        //canActivate: [roleGuard('Admin')]
    },
    {
        path: ':id',
        loadComponent: () => import('./detail/products-detail.page').then(m => m.ProductsDetailPage)
    },
]