import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//Importar componentes
import { HomeComponent } from './home/home.component';
//import { ContactoComponent } from './contacto/contacto.component';
import { ExcavacionesComponent} from './excavacion/excavacion.component';
import { EjemplaresComponent } from './ejemplar/ejemplar.component';
import { PersonasComponent } from './persona/persona.component';

const appRouter: Routes = [
    {path: 'paginaPrincipal', component:HomeComponent},
    {path: '', component: HomeComponent},
    //{path: 'contacto', component: ContactoComponent},
    {path: 'excavacion',component: ExcavacionesComponent},
    {path: 'ejemplar', component: EjemplaresComponent},
    {path: 'persona', component: PersonasComponent},
    {path:'**', component: HomeComponent}//cuando la ruta falle

];

export const appRoutingProviders: any[]=[];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRouter);
