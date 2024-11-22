import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { GridComponent } from './main/grid/grid.component';
import { CubeComponent } from './main/cube/cube.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    // User Routing
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },

    //Catalog Routing
    { path: 'catalog', children: [ 
        {path: '', component: GridComponent},
        {path: ':themeId', component: CubeComponent}

    ] },
    //Error Routing
    { path: '404', component: ErrorComponent },
    { path: '**', redirectTo: '/404' },
];
