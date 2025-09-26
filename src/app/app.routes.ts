import { Routes } from '@angular/router';
import { LayautComponent } from './core/layaut/layaut.component';
import { authGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';

export const routes: Routes = [
    { 
        path: '', component: LayautComponent, canActivate: [authGuard],
        children: [
            { path: '', component: DashboardComponent },
        ]
    },

    { path: 'login', component: LoginComponent },

    { path: '**', redirectTo: 'login' }
];
