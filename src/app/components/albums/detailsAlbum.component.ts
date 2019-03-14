import {Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { Artist } from '../../models/artist.models';
import { ArtistService} from '../../services/artist.service';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album.models';
import { Song } from 'src/app/models/song.models';
import { SongService } from 'src/app/services/songs.service';



@Component ({
    selector:'detailsAlbum',
    templateUrl:'../../views/albums/detailsAlbum.views.html',
    providers: [UserService, ArtistService,AlbumService,SongService]
})

export class detailAlbumComponent implements OnInit {

    
    public titulo: string;
    public artist: Artist;
    public song: Song;
    public album: Album;
    public albums: Album[];
    public identity;
    public token;
    public url;
    public alertMessage;
    public confirmado;

    

    constructor (
        private _userService:UserService,
        private _artistService:ArtistService,
        private _albumService:AlbumService,
        private _songService:SongService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.titulo = '';
        this.identity= this._userService.getIdentity();
        this.token= this._userService.getToken();
        this.url = GLOBAL.url;
  
    }
    

    ngOnInit (){
        console.log('detailsAlbum.component.ts cargado');
        this.getAlbum();
        this.getSongs();
        //llamar metodo del api para sacar un artista con base a su ID getArtist
       
    }

    getAlbum(){

        this._route.params.forEach((params: Params) =>{
            
            let id = params['id'];
    
                this._albumService.getAlbum(this.token, id).subscribe( 
                    response=>{
                        if(!response.album){
                            this._router.navigate(['/']);
                        }else {
                            this.album = response.album;
                            console.log(this.album);
                        }
                    },error =>{
                        var errorMessage =<any>error;
                            if(errorMessage != null){ 
                            console.log(error);
                            // this.alertMessage = error.error.message;
                            }
                    });
        })
    }

    getSongs (){
        this._route.params.forEach((params: Params) =>{
            let albumId = params['id'];
            this._songService.getSongs(this.token, albumId).subscribe(
                response =>{
                    this.song=response.song;
                    console.log(response);
                },error =>{
                    var errorMessage =<any>error;
                            if(errorMessage != null){ 
                            console.log(error);
                            // this.alertMessage = error.error.message;
                            }
                }
            )
    });

    }
}
