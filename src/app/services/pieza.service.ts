import {Injectable} from'@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';



@Injectable()
export class PiezaService{
    public url: string;
    
    constructor(private _http:Http){
        this.url="http://localhost:3031/api/";
    }

    getPiezas():Observable<any> {
        return this._http.get(this.url+"pieza").map(res => res.json().personas);
    }

    getPiezasEjemplar(ejemplarId):Observable<any>{
        return this._http.get(this.url+"piezaEjemplar/"+ejemplarId).map(res =>res.json().pieza);
    }
   
}