import {Component, TemplateRef } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Excavacion} from './excavacion';
import {ExcavacionService} from '../services/excavacion.service';
import {PersonaService} from '../services/persona.service';
import { BochonService } from '../services/bochon.service';
import { EjemplarService } from '../services/ejemplar.service';
import {config} from '../config';

@Component({
    selector:'Excavaciones',
    templateUrl:'./excavacion.component.html',
    providers: [ExcavacionService, PersonaService, BochonService, EjemplarService]
})

export class ExcavacionesComponent {
    public titulo ='Seccion de Excavaciones';
    public excavaciones;
    public rutaExca: string;
    public rutaEjem:string;
    public filtrado;
    public mostrarTodas:boolean;
    public directores;
    public paleontologos;
    public colectores;
    public personal;
    public bochones;
    public ejemplares;
    public unico: boolean;
    public fotoRuta;    
    public indicePagina:number;
    public currentPage:number;
    public page: number;
    public totalItems: number;
    public currentVideo;
    public indiceVideo;
    private excaElegida;
    public mostrarEjemplares:boolean;
    private ejemUnico;
    public  isCollapsed: boolean;

    public indice: number;

    constructor(private _peticionesService: ExcavacionService, 
                private _peticionesPerService: PersonaService,
                private _peticionesBochonService: BochonService,
                private _peticionesEjemplarService: EjemplarService){
        this.rutaExca=config.rutaExca;
        this.fotoRuta=config.rutaPersonalFoto;
        this.rutaEjem=config.rutaEjem;
        this.excavaciones=[];
        this.filtrado = {nombre:''};
        this.indicePagina=0;
        this.mostrarTodas=true;
        this.directores=[];
        this.paleontologos=[];
        this.colectores =[];
        this.personal=[];
        this.bochones=[];
        this.ejemplares=[];
        this.currentPage=1;
        this.indicePagina=0;
        this.totalItems=0;
        this.unico=false;
        this.currentVideo=0;
        this.indiceVideo=0;
        this.excaElegida={};        
        this.mostrarEjemplares=false;
        this.isCollapsed = false;
        this.indice=1;
    }
ngOnInit(){
    this.obtenerExcavaciones();
}
obtenerExcavaciones(){
    this._peticionesService.getExcavaciones().subscribe(
        result => {            
            this.excavaciones = result;
            this.obtenerDirectores();
            this.obtenerPaleontologos();
            this.obtenerColectores();
            if(!this.excavaciones){console.log("Error al tratar de recuperar las Excavaciones" + result);}
        },
        error =>{console.log(<any>error);}
    );    
}
obtenerDirectores(){
    for (let index = 0; index < this.excavaciones.length; index++) {
        const excavacion = this.excavaciones[index];
        this._peticionesPerService.getPersonaId(excavacion.directorId).subscribe(
            result => {
                let director = result;
                this.directores.push(director);
                if(!director){console.log("Error al tratar de recuperar un Director");}
            },error => {console.log(<any>error);}
        );        
    }
}
obtenerPaleontologos(){
    for (let index = 0; index < this.excavaciones.length; index++) {
        const excavacion = this.excavaciones[index];
        this._peticionesPerService.getPersonaId(excavacion.paleontologo).subscribe(
            result => {
                let paleontologo = result;
                this.paleontologos.push(paleontologo);
                if(!paleontologo){console.log("Error al tratar de recuperar un Director");}
            },error => {console.log(<any>error);}
        );        
    }
}
obtenerColectores(){
    for (let index = 0; index < this.excavaciones.length; index++) {
        const excavacion = this.excavaciones[index];
        this._peticionesPerService.getPersonaId(excavacion.colector).subscribe(
            result => {
                let colector = result;
                this.colectores.push(colector);
                if(!colector){console.log("Error al tratar de recuperar un Director");}
            },error => {console.log(<any>error);}
        );        
    }
}
obtenerBochonesyEjemplares(){
    this.bochones=[];
    this.ejemplares=[];
    if(this.verificarUnico())
    {
        if(this.excaElegida.bochonesEncontrados.length > 0) 
        {this.obtenerBochonesExcavacion(this.excaElegida.bochonesEncontrados);}
    }
}
verificarUnico(){
    let cant=0;
    for (let index = 0; index < this.excavaciones.length; index++) {
        const element = this.excavaciones[index];
        if(element.nombre.indexOf(this.filtrado.nombre) >=0 ){
            if(cant == 0) { this.excaElegida = element;}
            else {this.excaElegida={};}
            cant++;
        }
    }
    if(cant==1){return true;}
    else {return false;}
 }
obtenerBochonesExcavacion(bochonesEncontrados){
    for (let index = 0; index < bochonesEncontrados.length; index++) {
        const element = bochonesEncontrados[index];
        this._peticionesBochonService.getBochonId(element).subscribe(
            result => {          
                this.bochones.push(result);
                this.obtenerEjemplaresAsociados();                   
                if(!this.bochones){console.log("Error al tratar de recuperar los Bochones de una Excavación" + result);}
            },
            error =>{console.log(<any>error);}
        ); 
        
    }
}
obtenerEjemplaresAsociados(){
    for (let index = 0; index < this.bochones.length; index++) {
        const element = this.bochones[index];
        this._peticionesEjemplarService.getEjemplarId(element.ejemplarAsociado).subscribe(
            result => {
                this.ejemplares.push(result);
                if(!this.ejemplares){console.log("Error al tratar de recuperar el Ejemplar de un Bochon" + result);}
            },
            error =>{console.log(<any>error);}
        );    
    }
}
existePersonal(idPersona){
    let esta=false;
    for(let index = 0; index < this.personal.length; index++) {
        const element = this.personal[index];
        if(element._id==idPersona){
            esta=true;
            index = this.personal.length;
        }
    }
    return esta;
}
personalUnico(){
    let esta = false;
    for (let index = 0; index < this.directores.length; index++) {
        const element = this.directores[index];
        this.personaIncluida(element);
    }
    for (let index = 0; index < this.paleontologos.length; index++) {
        const element = this.paleontologos[index];
        this.personaIncluida(element);
    }
    for (let index = 0; index < this.colectores.length; index++) {
        const element = this.colectores[index];
        this.personaIncluida(element);
    }
   
}
elimEjemDupli(){
    this.ejemUnico=[];
    for (let index = 0; index < this.ejemplares.length; index++) {
        const element = this.ejemplares[index];
         this.ejemplaresUnico(element);
    }
    this.ejemplares=this.ejemUnico;
    if (this.mostrarEjemplares){this.mostrarEjemplares=false}
    else {this.mostrarEjemplares=true};
}
ejemplaresUnico(ejemplar){
    let esta=false;
    for (let index = 0; index < this.ejemUnico.length; index++) {
        const element = this.ejemUnico[index];
        if(ejemplar._id ==element._id){
            index=this.ejemUnico.length
            esta=true;
        }
    }
    if(!esta){this.ejemUnico.push(ejemplar)}
}
personaIncluida(persona){
    let esta=false;
    for (let p = 0; p < this.personal.length; p++) {
        const pers = this.personal[p];
        if(persona._id==pers._id){
            p=this.personal.length;
            esta=true;
        }
    }
    if(!esta){this.personal.push(persona); }   
}
pageChanged(event: any): void {
    this.page = event.page;
    this.indicePagina = 4*(this.page-1);
}
videoChanged(event: any): void {
    this.page = event.page;
    this.indiceVideo = this.page-1
}
mostrarExca(){
    if(this.mostrarTodas)
        {this.mostrarTodas=false;
        this.mostrarEjemplares=false;
        this.obtenerBochonesyEjemplares();
        }
    else {this.mostrarTodas = true;
          this.filtrado.nombre=''; }
    if(!this.unico) {this.personalUnico();
                    this.unico=true;}
    this.indicePagina=0;
    this.indiceVideo=0;
}
setearFiltro(param){
    this.filtrado = {nombre:param};
    if(!this.mostrarTodas) {this.mostrarTodas=true;}
    this.mostrarExca();
}

}