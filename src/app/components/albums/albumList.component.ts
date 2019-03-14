import {Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album.models';
import { Artist } from '../../models/artist.models';
import { ArtistService } from 'src/app/services/artist.service';


@Component ({
    selector:'albumList',
    templateUrl:'../../views/albums/albumList.views.html',
    providers: [UserService,AlbumService,ArtistService]
})

export class albumListComponent implements OnInit {

    public titulo: string;
    public albums: Album [];
    public artist: Artist;
    public identity;
    public token;
    public url;
    public nextPage;
    public prevPage;
    public alertMessage;

    constructor (
        private _userService:UserService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _albumService:AlbumService,
        private _artistService:ArtistService
    ){
        this.titulo = 'Listado de Albums';
        this.identity= this._userService.getIdentity();
        this.token= this._userService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit (){
        
        console.log('albumsList.component.ts cargado');
        this.getAlbums ();

}

getAlbums (){
 this._albumService.getAlbums(this.token).subscribe(
     response => {
        if(!response.albums){
            this._router.navigate(['/']);
        }else {
            this.albums=response.albums
        }
     },error=> {
        var errorMessage =<any>error;
        if(errorMessage != null){ 
        console.log(error);
        
    // this.alertMessage = error.error.message;
    }
     });
}
}