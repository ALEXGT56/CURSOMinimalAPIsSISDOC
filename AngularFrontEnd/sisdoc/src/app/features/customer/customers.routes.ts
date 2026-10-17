import { Routes } from "@angular/router";
import { roleGuard } from "../../core/guards/role.guard";

export const CUSTOMERS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./list/customers-list.page').then(m => m.CustomersListPage)
    },
    {
        path: 'new',
        loadComponent: () => import('./form/customers-form.page').then(m => m.customersFormPage),
        canActivate: [roleGuard('Admin')],
            
    },
    {
        path: ':id/edit',
        loadComponent: () => import('./form/customers-form.page').then(m => m.customersFormPage),
        canActivate: [roleGuard('Admin')]
    },
    {
        path: ':id',
        loadComponent: () => import('./detail/customers-detail.page').then(m => m.customersDetailPage)
    },
]