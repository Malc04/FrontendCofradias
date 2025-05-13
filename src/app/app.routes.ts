import { Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { AccesoComponent } from './acceso/acceso.component';

export const routes: Routes = [
    { path: '', component: PrincipalComponent},
    { path: 'acceso', component: AccesoComponent},
];
