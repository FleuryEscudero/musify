import {Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album.models';
import { Artist } from '../../models/artist.models';
import { ArtistService } from '../../services/artist.service';
import { Song } from 'src/app/models/song.models';
import { SongService } from 'src/app/services/songs.service';



@Component ({
    selector:'addSong',
    templateUrl:'../../views/songs/addSong.views.html',
    providers: [UserService,AlbumService,ArtistService,SongService]
})

export class addSongComponent implements OnInit {

    public titulo: string;
    public album: Album;
    public artist : Artist;
    public song : Song;
    public identity;
    public token;
    public url: string;
    public alertMessage;

    constructor (
        private _userService:UserService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _albumService:AlbumService,
        private _artistService:ArtistService,
        private _songService:SongService
    ){
        this.titulo = ' Añadir Canción';
        this.identity= this._userService.getIdentity();
        this.token= this._userService.getToken();
        this.url = GLOBAL.url;
        this.album = new Album ('','',2017,'',this.artist);
        this.artist = new Artist ('','','');
        this.song = new Song (1,'','','',this.album);

    }

    ngOnInit (){
        console.log('addSong.component.ts cargado');
       this.getAlbum();
        
        
    }


    public value;
    InputClearableExample (value){
    value = 'Clear me';
    }

    onSubmit(){
       // debugger;
        
        this._route.params.forEach((params: Params) =>{
            let albumId = params ['id'];
            this.song.album=albumId; 
            console.log(this.song);
            this._songService.addSong(this.token,this.song).subscribe(
                response =>{
                    if(!this.song){
                        this.alertMessage='La canción no se ha creado';
                    }else {
                        this.alertMessage='La canción se agrego exitosamente';
                        this.song = response.song;
                        this._router.navigate(['/detailsAlbum',albumId]);
                    }        
            },
            error =>{
                var errorMessage =<any>error;
                    if(errorMessage != null){ 
                    console.log(error);
                    this.alertMessage = error.error.message;
                }
            })
        })
     }
    getAlbum (){
        this._route.params.forEach((params: Params) =>{
            let albumID = params ['id'];
            this.album=albumID;
            this._albumService.getAlbum(this.token, albumID).subscribe(
                response => {
                    this.album= response.album
                    console.log(this.album);
                },error=>{
                    var errorMessage =<any>error;
                    if(errorMessage != null){ 
                    console.log(error);
                    }
                }
            )
            
            console.log(albumID);
        })
    };

    
}
