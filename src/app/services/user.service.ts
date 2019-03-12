import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../models/user.models';

@Injectable ()

export class UserService{
    
    public url: string;
    public identity;
    public token;

    constructor(
        public http:HttpClient
    ){
        this.url=GLOBAL.url;

       
    }

    login (userToLogin, gethash=null): Observable<any>{
        if (gethash !=null){
            userToLogin.gethash = gethash;
        }
        let json =JSON.stringify(userToLogin);
        let params = json;
        let headers =new HttpHeaders ({'Content-Type':'application/json'})

        return this.http.post<any>(this.url+'login',params, {headers: headers});
        
    }

    register (userToRegister){
        let json =JSON.stringify(userToRegister);
        let params = json;
        let headers =new HttpHeaders ({'Content-Type':'application/json'})
        console.log(userToRegister);
        return this.http.post<any>(this.url+'register',params, {headers: headers});
    }

    getIdentity (){
        let identity = JSON.parse(localStorage.getItem('identity'));

        if (identity !="undefined"){
            this.identity=identity;
        }else {
            this.identity=null;
        }
        return this.identity;
    }

    getToken (){
        let token = localStorage.getItem('token');
        if (token !='undefined'){
            this.token=token;
        }else {
            this.token=null;
        }
        return this.token;
    }

    updateUser (userToUpdated){
        let json =JSON.stringify(userToUpdated);
        let params = json;
        let headers =new HttpHeaders ({'Content-Type':'application/json', 'Authorization':this.getToken()
    });
        console.log(userToUpdated);
        return this.http.put<any>(this.url+'update/'+userToUpdated._id,params, {headers: headers});
    }

    
}

 