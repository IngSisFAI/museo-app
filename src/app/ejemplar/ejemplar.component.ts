import {Component , TemplateRef } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Ejemplar} from './ejemplar';
import {EjemplarService} from '../services/ejemplar.service';
import {PiezaService} from '../services/pieza.service';
import {BochonService} from '../services/bochon.service';

import {config} from '../config';

@Component({
    selector:'Ejemplares',
    templateUrl:'./ejemplar.component.html',
    providers: [EjemplarService, PiezaService, BochonService]
})

export class EjemplaresComponent {
    public ejemplares;
    public piezas;
    public bochones;
    public rutaEjem:string;
    public rutaPieza:string;
    public filtrado;
    public mostrarTodas:boolean;
    public indicePagina: number;
    public currentPage:number;
    public page: number;
    public currentVideo;
    public indiceVideo;
    

    constructor(private _peticionesService: EjemplarService, 
                private _peticionesPieService: PiezaService,
                private _peticionesBochonService: BochonService ){
        this.ejemplares=[];
        this.piezas=[];
        this.bochones=[];
        this.filtrado = {nombre:''};
        this.rutaEjem=config.rutaEjem;
        this.rutaPieza=config.rutaPieza;
        this.mostrarTodas=true;
        this.indicePagina=0;
        this.currentPage=1;
        this.currentVideo=0;
        this.indiceVideo=0;
    }

ngOnInit(){
    this.obtenerEjemplares();
}
obtenerEjemplares(){
    this._peticionesService.getEjemplares().subscribe(
        result => {
            this.ejemplares = result;
            if(!this.ejemplares){
                console.log("Error al tratar de recuperar los ejemplares" + result);
            }
        },
        error =>{
            console.log(<any>error);
        }
    );
}
obtenerAsociadosFiltro(){
    for (let index = 0; index < this.ejemplares.length; index++) {
        const element = this.ejemplares[index];
        if(element.nombre.indexOf(this.filtrado.nombre) >=0 ){
            this.piezasDelEjemplar(element._id);
            this.bochonesDelEjemplar(element._id);
        }        
    }
}
piezasDelEjemplar(ejemplarId){
    if(this.piezas.length > 0) { this.piezas=[];}
    this.obtenerPiezasEjemplar(ejemplarId);
}
obtenerPiezasEjemplar(ejemplar){
    this._peticionesPieService.getPiezasEjemplar(ejemplar).subscribe(
        result => {
            this.piezas = result;
            if(!this.piezas){
                console.log("Error al tratar de recuperar los ejemplares" + result);
            }
        },
        error =>{
            console.log(<any>error);
        }
    );   
}
bochonesDelEjemplar(ejemplarId){
    if(this.bochones.length > 0 ) {this.bochones=[];}
    this.obtenerBochonesEjemplar(ejemplarId);
}
obtenerBochonesEjemplar(ejemplar){
    this._peticionesBochonService.getBochonesEjemplar(ejemplar).subscribe(
        result => {
            this.bochones= result;
            if(!this.bochones){
                console.log("Error al tratar de recuperar los ejemplares" + result);
            }
        },
        error =>{
            console.log(<any>error);
        }
    );   
}
pageChanged(event: any): void {
    this.page = event.page;
    this.indicePagina = 2*(this.page-1);
}
setearFiltro(param){
    this.filtrado = {nombre:param};
    this.mostrarEjem();
}
mostrarEjem(){
    if(this.mostrarTodas)
        {this.mostrarTodas=false; 
        this.obtenerAsociadosFiltro();}
    else {this.mostrarTodas = true;
          this.filtrado.nombre=''; }
    this.indicePagina=0;
    this.indiceVideo=0;
}
videoChanged(event: any): void {
    this.page = event.page;
    this.indiceVideo = this.page-1
}


}