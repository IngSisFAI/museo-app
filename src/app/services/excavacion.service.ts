import {Injectable} from'@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';



@Injectable()
export class ExcavacionService{
    public url: string;
    
    constructor(private _http:Http){
        this.url="http://localhost:3001/api/excavacion";
    }

    getExcavaciones():Observable<any> {
        return this._http.get(this.url).map(res => res.json().excavaciones);
    }

    getExcavacionesHome(param):Observable<any>{
        return this._http.get("http://localhost:3001/api/excavacionHome/"+param).map(res=>res.json().excavacion);
    }

    getExcavacionesDirector(param):Observable<any>{
        return this._http.get("http://localhost:3001/api/excavacionDirector/"+param).map(res =>res.json().excavaciones);
    }
    getExcavacionesPaleontologo(param):Observable<any>{
        return this._http.get("http://localhost:3001/api/excavacionPaleontologo/"+param).map(res =>res.json().excavaciones);
    }
    getExcavacionesColector(param):Observable<any>{
        return this._http.get("http://localhost:3001/api/excavacionColector/"+param).map(res =>res.json().excavaciones);
    }
}