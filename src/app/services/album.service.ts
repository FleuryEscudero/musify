import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Album } from '../models/album.models';


@Injectable ()

export class AlbumService {

    public url: string;

constructor (
    public http:HttpClient
){
    this.url=GLOBAL.url;
}

getAlbum (token, id: string): Observable<any>{
    let headers = new HttpHeaders ({'Content-Type':'application/json', 'Authorization':token,});
    return this.http.get(this.url + 'album/'+ id, {headers:headers});
}

getAlbums (token, album: string): Observable<any>{
    let headers = new HttpHeaders ({'Content-Type':'application/json', 'Authorization':token,});
    return this.http.get(this.url + 'albums/'+ album, {headers:headers});
}

addAlbum (token, album:Album ){
    let params = JSON.stringify(album);
    let headers = new HttpHeaders ({'Content-Type':'application/json', 'Authorization':token});
    console.log(album);
    return this.http.post<any>(this.url+'album',params, {headers: headers});
}

updateAlbum (token, id: string, album: Album): Observable<any>{
    let params = JSON.stringify(album);
    let headers = new HttpHeaders ({'Content-Type':'application/json', 'Authorization':token});
    console.log(album);
    return this.http.put(this.url+'album/'+id ,params, {headers: headers});
}

deleteAlbum (token, id: string){
    let headers = new HttpHeaders ({'Content-Type':'application/json', 'Authorization':token,});
    return this.http.delete(this.url + 'album/'+ id, {headers:headers});
}
}