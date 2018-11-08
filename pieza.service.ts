import {Injectable} from'@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {config} from '../config';


@Injectable()
export class PiezaService{
    public url: string;
    
    constructor(private _http:Http){
        this.url=config.url;
    }

    getPiezas():Observable<any> {
        return this._http.get(this.url+"pieza").map(res => res.json().personas);
    }

    getPiezasEjemplar(ejemplarId):Observable<any>{
        return this._http.get(this.url+"piezaEjemplar/"+ejemplarId).map(res =>res.json().pieza);
    }
   
}