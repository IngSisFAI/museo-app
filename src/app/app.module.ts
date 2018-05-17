import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpModule} from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
//import {NgxOrderByModule} from 'ngx-order-by';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { AlertModule } from 'ngx-bootstrap';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ContactoComponent} from './contacto/contacto.component';
import {ExcavacionesComponent} from './excavacion/excavacion.component';
import {EjemplaresComponent} from './ejemplar/ejemplar.component';
import {PersonasComponent} from './persona/persona.component';
import { CarouselModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { PopoverModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent,
    ContactoComponent,
    ExcavacionesComponent,
    EjemplaresComponent,
    PersonasComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    //NgxOrderByModule,
    FilterPipeModule,
    OrderModule,
    AlertModule.forRoot(),
    CarouselModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    routing    
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})

export class AppModule { }
