import { Routes } from "@angular/router";
import { roleGuard } from "../../core/guards/role.guard";

export const DOCUMENTTICKET_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./list/documentticket-list.page').then(m => m.DocumentTicketListPage)
    }, 
]