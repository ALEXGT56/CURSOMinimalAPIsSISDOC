import { Routes } from "@angular/router";
import { roleGuard } from "../../core/guards/role.guard";

export const DOCUMENTTICKET_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./list/documentticket-list.page').then(m => m.DocumentTicketListPage)
    }, 
    {
        path: 'new',
        loadComponent: () => import('./form/documentticket-form.page').then(m => m.DocumentTicketFormPage),
        //canActivate: [roleGuard('Admin')],
            
    },
    {
        path: ':id/edit',
        loadComponent: () => import('./form/documentticket-form.page').then(m => m.DocumentTicketFormPage),
        //canActivate: [roleGuard('Admin')]
    },
]