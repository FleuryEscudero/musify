import {Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album.models';
import { Artist } from '../../models/artist.models';
import { ArtistService } from '../../services/artist.service';


@Component ({
    selector:'addAlbum',
    templateUrl:'../../views/albums/addAlbum.views.html',
    providers: [UserService,AlbumService,ArtistService]
})

export class addAlbumComponent implements OnInit {

    public titulo: string;
    public album: Album;
    public artist : Artist;
    public identity;
    public token;
    public url: string;
    public alertMessage;

    constructor (
        private _userService:UserService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _albumService:AlbumService,
        private _artistService:ArtistService
    ){
        this.titulo = ' Añadir Albums';
        this.identity= this._userService.getIdentity();
        this.token= this._userService.getToken();
        this.url = GLOBAL.url;
        this.album = new Album ('','',2017,'','');
        this.artist = new Artist ('','','');

    }

    ngOnInit (){
        console.log('addAlbum.component.ts cargado');
        this.getArtist ();
        
}

public value;
    InputClearableExample (value){
    value = 'Clear me';
  }

    onSubmit(){
        this._route.params.forEach((params: Params) =>{
            let artistId = params ['artist'];
            this.album.artist = artistId;
            //esta sentencia inyecta la informacion a la base de datos
            this._albumService.addAlbum(this.token, this.album).subscribe(
                response => {
                    //debugger;
                    if (!response.album){
                        this.alertMessage='El album no se ha creado';
                    }else { 
                        this.alertMessage='El album se ha creado correctamente';
                        this.album = response.album;

                        this._router.navigate(['/editAlbum', this.album._id]);
                    }
            },
            error => {
                var errorMessage =<any>error;
                if(errorMessage != null){ 
                console.log(error);
                this.alertMessage = error.error.message;
                }
            }
            )

        })
    }

  getArtist (){

        this._route.params.forEach((params: Params) =>{
            let artistID = params ['artist'];
            this._artistService.getArtist(this.token, artistID).subscribe(
                response => {
                    this.artist= response.artist
                    console.log(this.artist);
                    console.log(this.artist.name);
                },error=>{
                    var errorMessage =<any>error;
                    if(errorMessage != null){ 
                    console.log(error);
                    }
                }
            )
            
            console.log(artistID);
        })
    };

}