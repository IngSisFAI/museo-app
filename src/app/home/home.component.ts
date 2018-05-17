import {Component} from '@angular/core';
import { ExcavacionesComponent} from '../excavacion/excavacion.component';
import { ExcavacionService } from '../services/excavacion.service';
import { EjemplarService } from '../services/ejemplar.service';
import { Pipe, PipeTransform } from '@angular/core';

//const config = require('../config');


@Component({
    selector: 'Home',
    templateUrl: './home.component.html',
    providers: [ExcavacionService, EjemplarService]
})

export class HomeComponent {
    public excavacionesHome;
    public rutaExca: string;
    public ejemplaresHome;
    public rutaEjem:string;
    

    constructor(private _peticionesService: ExcavacionService, 
                private _peticionesEjemService: EjemplarService){
        this.excavacionesHome=[];
        this.rutaExca ='assets/datos/excavaciones/';
        this.rutaEjem='assets/datos/ejemplares/';
        this.ejemplaresHome=[];
        }
        
    ngOnInit(){
        this.obtenerExcaHome();
        this.obtenerEjemHome();
    }

private obtenerExcaHome(){
    this._peticionesService.getExcavacionesHome(true).subscribe(
        result => {
            this.excavacionesHome= result;
            if(!this.excavacionesHome){
                console.log("Error al tratar de recuperar las Excavaciones"+ result);
            }
        },
        error =>{
            console.log(<any>error);
        }
    );   

}
private obtenerEjemHome(){
    this._peticionesEjemService.getEjemHome(true).subscribe(
        result =>{
            this.ejemplaresHome=result;
            if(!this.ejemplaresHome){
                console.log("Error al tratar de recuperar los Ejemplares para el Home"+ result);
            }
        },
        error =>{console.log(<any>error);}

    );
}

}