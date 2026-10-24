import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
   //Rutas públicas (sin autenticación)
    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/login/login.page').then((m) => m.LoginPage)
    },
    {
        path: '403',
        loadComponent: () =>
            import('./features/errors/forbidden/forbidden.page').then((m) => m.ForbiddenPage)
    },
    {
        path: '404',
        loadComponent: () =>
            import('./features/errors/notfound/notfound.page').then((m) => m.NotfoundPage)
    },
   //Rutas protegidas (Con autenticación)
   {
        path: '',
        component: ShellComponent,
        canActivate: [authGuard],
        children:
        [
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./features/dashboard/dashboard.page').then((m) => m.DashboardPage)
            },
            {
                path: 'globalstatus',
                loadChildren: () =>
                    import('./features/globalstatus/globalstate.routes').then((m) => m.GLOBALSTATUS_ROUTES)
            },
            {
                path: 'persons',
                loadChildren: () =>
                    import('./features/persons/persons.routes').then((m) => m.PERSONS_ROUTES)
            },
            {
                path: 'documentticket',
                loadChildren: () =>
                    import('./features/documentticket/documentticket.routes').then((m) => m.DOCUMENTTICKET_ROUTES)
            },
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
        ]
   },

   //catch-all
   {
     path: '**',
        loadComponent: () =>
            import('./features/errors/notfound/notfound.page').then((m) => m.NotfoundPage)
   }
];
