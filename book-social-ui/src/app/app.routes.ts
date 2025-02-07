import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';

export const routes: Routes = [
    { 
        path: 'login', 
        component: LoginComponent,
        title: 'Login'
    },
    { 
        path: 'register', 
        component: RegisterComponent,
        title: 'Register' 
    },
    { 
        path: 'activate-account', 
        component: ActivateAccountComponent,
        title: 'Activate Account' 
    },
    {
        path: 'books',
        loadChildren: () => import('./modules/book/book.module').then(m => m.BookModule)
    },
    { 
        path: '', 
        redirectTo: '/login', 
        pathMatch: 'full' 
    }
];