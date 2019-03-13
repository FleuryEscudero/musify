import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable ()

export class UploadService {

    public url: string;

constructor (
    public http:HttpClient
){
    this.url=GLOBAL.url;
}

imageRequest(url: string, params: Array<string>, file: File,token: string, name:string){
   
    return new Promise (function(resolve, reject){
    var formData: any = new FormData();
    var xhr = new XMLHttpRequest();

    // for (var i = 0; i >files.length; i++){
    //     formData.append(name, files [i], files[i].name);
    // }
    formData.append('image', file, file.name);

    xhr.onreadystatechange = function (){
        if(xhr.readyState ==4){
            if(xhr.status==200){
                resolve(JSON.parse(xhr.response));
            }else{
                reject(xhr.response);
            }
        }
    }

     xhr.open('POST',url,true);
     xhr.setRequestHeader('Authorization',token);
     xhr.send(formData);
    }
    );
}

}