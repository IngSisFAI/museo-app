import {Injectable} from'@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';



@Injectable()
export class PersonaService{
    public url: string;
    
    constructor(private _http:Http){
        this.url="http://localhost:3031/api/";
    }

    getPersonas():Observable<any> {
        return this._http.get(this.url+"persona").map(res => res.json().personas);
    }

    getPersonaId(personaId):Observable<any>{
        return this._http.get(this.url+"/personaId/"+personaId).map(res =>res.json().personaId);
    }
   
}