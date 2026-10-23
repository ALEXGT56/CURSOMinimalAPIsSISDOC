import { Routes } from "@angular/router";
import { roleGuard } from "../../core/guards/role.guard";

export const GLOBALSTATUS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./list/globalstatus-list.page').then(m => m.GlobalStatusListPage)
    },
    {
        path: 'new',
        loadComponent: () => import('./form/globalstatus-form.page').then(m => m.GlobalStatusFormPage),
        //canActivate: [roleGuard('Admin')],
            
    },
    {
        path: ':id/edit',
        loadComponent: () => import('./form/globalstatus-form.page').then(m => m.GlobalStatusFormPage),
        //canActivate: [roleGuard('Admin')]
    },
    {
        path: ':id',
        loadComponent: () => import('./detail/globalstatus-detail.page').then(m => m.GlobalStatusDetailPage)
    },
]