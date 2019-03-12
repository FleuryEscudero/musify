import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpClient} from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Artist } from '../models/artist.models';

@Injectable ()

export class ArtistService {

    public url: string;

constructor (
    public http:HttpClient
){
    this.url=GLOBAL.url;
}

getArtists (token, page): Observable<any>{
    let headers = new HttpHeaders ({'Content-Type':'application/json', 'Authorization':token,});
    return this.http.get(this.url + 'artists/'+ page, {headers:headers});
}

getArtist (token, id: string): Observable<any>{
    let headers = new HttpHeaders ({'Content-Type':'application/json', 'Authorization':token,});
    return this.http.get(this.url + 'artist/'+ id, {headers:headers});
}

addArtist (token, artist: Artist){
    let params = JSON.stringify(artist);
    let headers = new HttpHeaders ({'Content-Type':'application/json', 'Authorization':token});
    console.log(artist);
    return this.http.post<any>(this.url+'artist',params, {headers: headers});

}

updateArtist (token, id: string, artist: Artist): Observable<any>{
    let params = JSON.stringify(artist);
    let headers = new HttpHeaders ({'Content-Type':'application/json', 'Authorization':token});
    console.log(artist);
    return this.http.put(this.url+'artist/'+id ,params, {headers: headers});

}

deleteArtist (token, id: string): Observable<any>{
    let headers = new HttpHeaders ({'Content-Type':'application/json', 'Authorization':token,});
    return this.http.delete(this.url + 'artist/'+ id, {headers:headers});
}

}