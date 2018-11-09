import {Injectable} from'@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {config} from '../config'


@Injectable()
export class ExcavacionService{
    public url: string;
    
    constructor(private _http:Http){
        this.url= config.url;
    }

    getExcavaciones():Observable<any> {
        return this._http.get(this.url+"excavacion").map(res => res.json().excavaciones);
    }

    getExcavacionesHome(param):Observable<any>{
        return this._http.get(this.url+"excavacionHome/"+param).map(res=>res.json().excavacion);
    }

    getExcavacionesDirector(param):Observable<any>{
        return this._http.get(this.url+"excavacionDirector/"+param).map(res =>res.json().excavaciones);
    }
    getExcavacionesPaleontologo(param):Observable<any>{
        return this._http.get(this.url+"excavacionPaleontologo/"+param).map(res =>res.json().excavaciones);
    }
    getExcavacionesColector(param):Observable<any>{
        return this._http.get(this.url+"excavacionColector/"+param).map(res =>res.json().excavaciones);
    }
}