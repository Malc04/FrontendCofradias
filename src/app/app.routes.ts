import { Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { AccesoComponent } from './acceso/acceso.component';
import { InicioComponent } from './inicio/inicio.component';
import { AfiliacionComponent } from './afiliacion/afiliacion.component';
import { CuartelilloComponent } from './cuartelillo/cuartelillo.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { TiendaComponent } from './tienda/tienda.component';
import { GestionrolComponent } from './gestionrol/gestionrol.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ResumenCompraComponent } from './resumen-compra/resumen-compra.component';
import { HistorialComprasComponent } from './historial-compras/historial-compras.component';

export const routes: Routes = [
    {
        path: '',
        component: PrincipalComponent,
        children: [
            { path: '', component: InicioComponent }, // por defecto dentro de Principal
            { path: 'afiliacion', component: AfiliacionComponent },
            { path: 'cuartelillo', component: CuartelilloComponent },
            { path: 'noticia', component: NoticiasComponent },
            { path: 'tienda', component: TiendaComponent }
        ]
    },
    { path: 'acceso', component: AccesoComponent },
    { path: 'gestionrol', component: GestionrolComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'resumen-compra', component: ResumenCompraComponent },
    { path: 'historial-compras', component: HistorialComprasComponent },

];