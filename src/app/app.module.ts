import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpModule} from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { AlertModule } from 'ngx-bootstrap';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ExcavacionesComponent} from './excavacion/excavacion.component';
import {EjemplaresComponent} from './ejemplar/ejemplar.component';
import {PersonasComponent} from './persona/persona.component';

import { CarouselModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap';
import { AccordionModule } from 'ngx-bootstrap';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent,
    ExcavacionesComponent,
    EjemplaresComponent,
    PersonasComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    FilterPipeModule,
    OrderModule,
    AlertModule.forRoot(),
    CarouselModule,
    PaginationModule.forRoot(),
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    routing    
  ],
  providers: [appRoutingProviders, { provide: CarouselConfig, useValue: { interval: 6000, noPause: true, showIndicators: true } }],
  bootstrap: [AppComponent]
})

export class AppModule { }
