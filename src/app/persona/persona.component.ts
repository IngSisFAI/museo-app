import {Component, TemplateRef } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Persona} from './persona';
import {PersonaService} from '../services/persona.service';
import {ExcavacionService} from '../services/excavacion.service';
import { Pipe, PipeTransform } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
    selector:'Personas',
    templateUrl:'./persona.component.html',
    providers: [PersonaService,ExcavacionService]
})

export class PersonasComponent{
    public personas;
    public curriculumRuta: string;
    public fotoRuta: string;
    public rutaExca:string;
    public busqueda: boolean;
    public filtrado;
    public personaSeleccionada;
    public excaDirige;
    public excaPaleo;
    public excaColec;
    public mostrarTodas:boolean;
    public indicePagina:number;
    public currentPage:number;
    public page: number;
    modalRef: BsModalRef;

    constructor(private _peticionesService: PersonaService, 
                private _peticionesExcaService: ExcavacionService,
                private modalService: BsModalService){
        this.curriculumRuta='assets/datos/personal/curriculumPersonal/';
        this.fotoRuta='assets/datos/personal/fotosPersonal/';
        this.rutaExca= 'assets/datos/excavaciones/';
        this.personas = [];
        this.excaDirige = [];
        this.excaPaleo = [];
        this.excaColec = [];
        this.busqueda = true;
        this.filtrado = {nombres:'',apellidos:'',dni:''};
        //this.personaSeleccionada= false;
        this.mostrarTodas=true;
        this.currentPage=1;
        this.indicePagina=0;
    }

ngOnInit(){
    this._peticionesService.getPersonas().subscribe(
        result =>{
            this.personas = result;
            if(!this.personas){ console.log("Error al tratar de recuperar las Personas" + result);}
        },
        error => { console.log(<any>error);}
    );
}

buscaExca(persona) {
    console.log("Entramos a buscar con la persona cuyo id es: "+persona);
    this.excaDirige = [];
    this.excaPaleo = [];
    this.excaColec = [];
    this.buscaExcaDirige(persona);
    this.buscaExcaPaleontologo(persona);
    this.buscaExcaColector(persona);
    console.log("Salimos del Buscar excavaciones que tiene a cargo "+ persona);
}
private buscaExcaDirige(persona) {
    this._peticionesExcaService.getExcavacionesDirector(persona).subscribe(
        result =>{
            this.excaDirige = result;
            if(!this.excaDirige){console.log("Error al tratar de recuperar los Directores" + result)}
        }, error => { console.log(<any>error);}
    );
}
private buscaExcaPaleontologo(persona) {
    this._peticionesExcaService.getExcavacionesPaleontologo(persona).subscribe(
        result =>{
            this.excaPaleo=result;
            if(!this.excaPaleo) {console.log("Error al tratar de recuperar los Paleontologos"+ result)}
        }, error =>{console.log(<any>error);}
    );
}
private buscaExcaColector(persona) {
        this._peticionesExcaService.getExcavacionesColector(persona).subscribe(
        result =>{
            this.excaColec=result;
            if(!this.excaColec) {console.log("Error al tratar de recuperar los Colectores"+ result)}
        }, error =>{console.log(<any>error);}
    );
}
pageChanged(event: any): void {
    this.page = event.page;
    this.indicePagina = 4*(this.page-1);
}
setearFiltro(param,param2,paramid){
    this.filtrado = {nombres:param,apellidos:param2,dni:''};
    if(!this.mostrarTodas) {this.mostrarTodas=true;}
    this.buscaExca(paramid);
    this.mostrarPersona();
}
mostrarPersona(){
    if(this.mostrarTodas)
        {this.mostrarTodas=false;
        }
    else {this.mostrarTodas = true;
          this.filtrado={nombres:'',apellidos:'',dni:''}; }
    this.indicePagina=0;
    //this.indiceVideo=0;
}
openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
