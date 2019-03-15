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
import { UploadService } from '../../services/upload.service';

@Component ({
    selector:'editSong',
    templateUrl:'../../views/songs/addSong.views.html',
    providers: [UserService,AlbumService,ArtistService,SongService,UploadService]
})

export class editSongComponent implements OnInit {

    public titulo: string;
    public album: Album;
    public artist : Artist;
    public song : Song;
    public identity;
    public token;
    public url: string;
    public alertMessage;
    public isEdit;
    public confirmado;
    private filesToUpload;

    constructor (
        private _userService:UserService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _albumService:AlbumService,
        private _artistService:ArtistService,
        private _songService:SongService,
        private _uploadService:UploadService
    ){
        this.titulo = ' Editar Canción';
        this.identity= this._userService.getIdentity();
        this.token= this._userService.getToken();
        this.url = GLOBAL.url;
        this.album = new Album ('','',2017,'',this.artist);
        this.artist = new Artist ('','','');
        this.song = new Song (0,'','','',this.album);

    }
ngOnInit (){
    console.log('editSong.component.ts cargado');
    this.getSong ();
    
}

public value;
InputClearableExample (value){
value = 'Clear me';
}

onSubmit(){
    // this._route.params.forEach((params: Params) =>{
    //     let id = params ['id'];
    //     //esta sentencia inyecta la informacion a la base de datos
    //     this._albumService.updateAlbum(this.token,id ,this.album).subscribe(
    //         response => {
                 
    //             if (!response.album){
    //                 console.log(response.album);
    //                 this.alertMessage='Error en el sistema';
                    
    //             }else { 
    //                 this.alertMessage='El album se ha creado correctamente';
    //                 if (!this.filesToUpload){
    //                     //Redirigir
    //                     this._router.navigate(['/artist/',response.artist._id]);
    //                     console.log(response.album.artist);
    //                 }else {
    //                     //subir imagen
    //                     this._uploadService.imageRequest(this.url+'uploadImageAlbum/'+id, [],
    //                     this.filesToUpload,this.token, "image")
    //                        .then(
    //                            (response)=> {
                                   
    //                                this._router.navigate(['/detailArtist/',this.album.artist]);
    //                            },(error) =>{
    //                                console.log(error);
    //                            }
    //                        );
    //                 }
                    
                    
                   
    //             }
    //     },
    //     error => {
    //         var errorMessage =<any>error;
    //         if(errorMessage != null){ 
    //         console.log(error);
    //         this.alertMessage = error.error.message;
    //         }
    //     }
    //     );

    // });
}

getSong (){
  this._route.params.forEach((params:Params) => {
      let songId= params ['id'];
      this.song=songId;
      console.log(songId);
      this._songService.getSong(this.token, songId).subscribe(
          response=>{
            this.song=response.song;
          },
          error =>{
             var errorMessage =<any>error;
                if(errorMessage != null){ 
                console.log(error);
                }
          }
          
      )
  })
}

songFileChangeEvent(fileInput: any){
    this.filesToUpload = <File>fileInput.target.files[0];
    console.log(this.filesToUpload)
}

onDeleteConfirm (id){
this.confirmado = id;
}

onCancelSong(){
this.confirmado = null;
}

onDeleteSong (id){
this._songService.deleteSong(this.token, id).subscribe (
// this._artistService.deleteArtist(this.token, id).subscribe ( 
    response => {
        debugger;
     if(!this.song){
         alert('Canción Borrada con Exito')
     } 
     this.getSong();
},
    error =>{
        var errorMessage =<any>error;
        if(errorMessage != null){ 
        console.log(error);
        
    // this.alertMessage = error.error.message;
    }
})
}


}