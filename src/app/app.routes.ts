import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    //TODO: fix redirect to 404
    { path: '404', component: ErrorComponent },
    { path: '**', redirectTo: '/404' },
];
