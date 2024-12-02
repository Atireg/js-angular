import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './404/404.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { CubeComponent } from './main/cube/cube.component';
import { CubeCatalogComponent } from './main/cube-catalog/cube-catalog.component';
import { CreateCubeComponent } from './main/create-cube/create-cube.component';
import { AuthGuard } from './guards/auth.guard';
import { ErrorMsgComponent } from './core/error-msg/error-msg.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    // User Routing
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    //Catalog Routing
    {
        path: 'catalog', children: [
            { path: '', component: CubeCatalogComponent },
            // { path: ':themeId', component: CubeComponent, canActivate: [AuthGuard] },
            { path: ':themeId', component: CubeComponent },
        ]
    },
    { path: 'create-cube', component: CreateCubeComponent, canActivate: [AuthGuard] },
    //Error Routing
    {path: 'error', component: ErrorMsgComponent},
    { path: '404', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/404' },
];
