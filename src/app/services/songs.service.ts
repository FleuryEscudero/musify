import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Song } from '../models/song.models';

@Injectable ()

export class SongService {

    public url: string;

constructor (
    public http:HttpClient
){
    this.url=GLOBAL.url;
}

getSong (token, id): Observable<any>{
    let headers = new HttpHeaders ({'Content-Type':'application/json', 'Authorization':token,});
    return this.http.get(this.url + 'songs/'+ id, {headers:headers});
}

getSongs (token, albumId: null): Observable<any>{
    let headers = new HttpHeaders ({'Content-Type':'application/json', 'Authorization':token,});
    if(albumId == null){
        return this.http.get(this.url + 'songs/', {headers:headers})
    }else {
        return this.http.get(this.url + 'songs/'+ albumId, {headers:headers});
    }
}

addSong (token, song: Song){
    debugger;
    let params = JSON.stringify(song);
    let headers = new HttpHeaders ({'Content-Type':'application/json', 'Authorization':token});
    console.log(song);
    return this.http.post<any>(this.url+'song',params, {headers: headers});

}

updateSong (token, id: string, song: Song): Observable<any>{
    let params = JSON.stringify(song);
    let headers = new HttpHeaders ({'Content-Type':'application/json', 'Authorization':token});
    console.log(song);
    return this.http.put(this.url+'song/'+id ,params, {headers: headers});

}

deleteSong (token, id: string): Observable<any>{
    let headers = new HttpHeaders ({'Content-Type':'application/json', 'Authorization':token,});
    return this.http.delete(this.url + 'song/'+ id, {headers:headers});
}

}