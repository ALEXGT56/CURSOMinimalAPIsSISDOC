import { Routes } from "@angular/router";
import { roleGuard } from "../../core/guards/role.guard";

export const PERSONS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./list/persons-list.page').then(m => m.PersonsListPage)
    },
    {
        path: 'new',
        loadComponent: () => import('./form/persons-form.page').then(m => m.personsFormPage),
        //canActivate: [roleGuard('Admin')],
            
    },
    {
        path: ':id/edit',
        loadComponent: () => import('./form/persons-form.page').then(m => m.personsFormPage),
        //canActivate: [roleGuard('Admin')]
    },
    {
        path: ':id',
        loadComponent: () => import('./detail/persons-detail.page').then(m => m.personsDetailPage)
    },
]