import {Component} from '@angular/core';
import { ExcavacionesComponent} from '../excavacion/excavacion.component';
import { ExcavacionService } from '../services/excavacion.service';
import { EjemplarService } from '../services/ejemplar.service';
import {HomeService } from '../services/home.service';
import { Pipe, PipeTransform } from '@angular/core';

import {config} from '../config';


@Component({
    selector: 'Home',
    templateUrl: './home.component.html',
    providers: [ExcavacionService, EjemplarService, HomeService]
})

export class HomeComponent {
    public excavacionesHome;
    public rutaExca: string;
    public ejemplaresHome;
    public rutaEjem:string;
    public infoHome;
    public rutaHome:string;
    

    constructor(private _peticionesService: ExcavacionService, 
                private _peticionesEjemService: EjemplarService,
                private _peticionesHome: HomeService){
        this.excavacionesHome=[];
        this.rutaExca =config.rutaExca;
        this.rutaEjem=config.rutaEjem;
        this.rutaHome=config.rutaHome;
        this.ejemplaresHome=[];
        this.infoHome=[];
        }
        
    ngOnInit(){
        this.obtenerExcaHome();
        this.obtenerEjemHome();
        this.obtenerInfoHome();        
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

private obtenerInfoHome(){
    this._peticionesHome.getInfoHome().subscribe(
        result => {
            this.infoHome= result;
            if(!this.infoHome){
                console.log("Error al tratar de recuperar la informacion general del Home"+ result);
            }
        },
        error =>{
            console.log(<any>error);
        }
    );   

}

}