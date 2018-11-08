import {Injectable} from'@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {config} from '../config'

@Injectable()
export class HomeService{
    public url: string;
    
    constructor(private _http:Http){
        this.url=config.url+"info";
    }

    getInfoHome():Observable<any> {
        return this._http.get(this.url).map(res => res.json().home);
    }

}