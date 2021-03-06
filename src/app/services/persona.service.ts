import {Injectable} from'@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {config} from '../config';


@Injectable()
export class PersonaService{
    public url: string;
    
    constructor(private _http:Http){
        this.url=config.url;
    }

    getPersonas():Observable<any> {
        return this._http.get(this.url+"persona").map(res => res.json().personas);
    }

    getPersonaId(personaId):Observable<any>{
        return this._http.get(this.url+"/personaId/"+personaId).map(res =>res.json().personaId);
    }
   
}