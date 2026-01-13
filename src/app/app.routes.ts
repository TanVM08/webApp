import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AdminLayoutComponent } from './base/layout/admin-layout/admin-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: '**', redirectTo: 'dashboard' },
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
             {
                path: 'login',
                component: LoginComponent,
            },
        ]
    }
];
