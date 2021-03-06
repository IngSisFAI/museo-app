import {Injectable} from'@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {config} from '../config';


@Injectable()
export class EjemplarService{
    public url: string;
    
    constructor(private _http:Http){
        this.url=config.url;
    }

getEjemplares():Observable<any> {
        return this._http.get(this.url+"ejemplar").map(res => res.json().ejemplares);
}

getEjemplarId(idEjemplar):Observable<any>{
    return this._http.get(this.url+"ejemplarId/"+idEjemplar).map(res=>res.json().ejemplarId);
}
getEjemHome(idEjemplar):Observable<any>{
    return this._http.get(this.url+"ejemplarHome/"+idEjemplar).map(res=>res.json().ejemplar);
}
getEjemExca(idExcavacion):Observable<any>{
    return this._http.get(this.url+"ejemplarExca/"+idExcavacion).map(res=>res.json().ejemplar);
}

}