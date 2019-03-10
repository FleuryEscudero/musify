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

addArtist (token, artist: Artist){
    let params = JSON.stringify(artist);
    let headers = new HttpHeaders ({'Content-Type':'application/json', 'Authorization':token})
    console.log(artist);
    return this.http.post<any>(this.url+'artist',params, {headers: headers});

}


}