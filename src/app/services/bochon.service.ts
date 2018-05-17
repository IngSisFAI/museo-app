import {Injectable} from'@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';



@Injectable()
export class BochonService{
    public url: string;
    
    constructor(private _http:Http){
        this.url="http://localhost:3031/api/";
    }

    getBochones():Observable<any> {
        return this._http.get(this.url+"bochon").map(res => res.json().bochon);
    }

    getBochonesEjemplar(ejemplarId):Observable<any>{
        return this._http.get(this.url+"bochonEjemplar/"+ejemplarId).map(res =>res.json().bochon);
    }
    
    getBochonId(bochonId):Observable<any>{
        return this._http.get(this.url+"bochonId/"+bochonId).map(res=>res.json().bochonId);
    }
}