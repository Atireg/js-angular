import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './404/404.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { CubeComponent } from './main/cube/cube.component';
import { CubeCatalogComponent } from './main/cube-catalog/cube-catalog.component';
import { AuthGuard } from './guards/auth.guard';
import { ErrorMsgComponent } from './core/error-msg/error-msg.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    // User Routing
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'profile', loadComponent: () =>
            import('./user/profile/profile.component')
            .then((c) => c.ProfileComponent),
        canActivate: [AuthGuard],
    },
    //Catalog Routing
    {
        path: 'catalog', children: [
            { path: '', component: CubeCatalogComponent },
            {
                path: ':themeId',
                component: CubeComponent,
                children: [
                    {
                        path: 'create-post', loadComponent: () =>
                            import('./main/create-post/create-post.component')
                            .then((c) => c.CreatePostComponent),
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'edit-post', loadComponent: () =>
                            import('./main/edit-post/edit-post.component')
                            .then((c) => c.EditCubeComponent),
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'delete-post', loadComponent: () =>
                            import('./main/delete-post/delete-post.component')
                            .then((c) => c.DeletePostComponent),
                        canActivate: [AuthGuard]
                    }

                ]
            },
        ]
    },
    {
        path: 'create-cube',
        loadComponent: () => import('./main/create-cube/create-cube.component')
            .then((c) => c.CreateCubeComponent),
        canActivate: [AuthGuard],
    },

    //Error Routing
    { path: 'error', component: ErrorMsgComponent },
    { path: '404', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/404' },
];
