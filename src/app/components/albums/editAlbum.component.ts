import {Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album.models';
import { Artist } from '../../models/artist.models';
import { ArtistService } from '../../services/artist.service';
import { UploadService } from '../../services/upload.service';


@Component ({
    selector:'editAlbum',
    templateUrl:'../../views/albums/addAlbum.views.html',
    providers: [UserService,AlbumService,ArtistService,UploadService]
})

export class editAlbumComponent implements OnInit {

    public titulo: string;
    public album: Album;
    public albums : Album [];
    public artist : Artist;
    public identity;
    public token;
    public url: string;
    public alertMessage;
    public isEdit;
    private filesToUpload;
    public confirmado;

    constructor (
        private _userService:UserService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _albumService:AlbumService,
        private _artistService:ArtistService,
        private _uploadService : UploadService
    ){
        this.titulo = ' Editar Albums';
        this.identity= this._userService.getIdentity();
        this.token= this._userService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist ('','','');
        this.album = new Album ('','',2017,'','');
        this.artist = new Artist ('','','');
        this.isEdit=true;

    }

    ngOnInit (){
        console.log('editAlbum.component.ts cargado');
        this.getAlbum ();
        
}

public value;
    InputClearableExample (value){
    value = 'Clear me';
  }

    onSubmit(){
        this._route.params.forEach((params: Params) =>{
            let id = params ['id'];
            //esta sentencia inyecta la informacion a la base de datos
            this._albumService.updateAlbum(this.token,id ,this.album).subscribe(
                response => {
                    // debugger;
                    if (!response.album){
                        console.log(response.album);
                        this.alertMessage='Error en el sistema';
                        
                    }else { 
                        this.alertMessage='El album se ha creado correctamente';
                        if (!this.filesToUpload){
                            //Redirigir
                            this._router.navigate(['/artist/',response.album.artist]);
                            console.log(response.album.artist);
                        }else {
                            //subir imagen
                            this._uploadService.imageRequest(this.url+'uploadImageAlbum/'+id, [],
                            this.filesToUpload,this.token, "image")
                               .then(
                                   (response)=> {
                                       
                                       this._router.navigate(['/detailArtist/',this.album.artist._id]);
                                   },(error) =>{
                                       console.log(error);
                                   }
                               );
                        }
                        
                        
                       
                    }
            },
            error => {
                var errorMessage =<any>error;
                if(errorMessage != null){ 
                console.log(error);
                this.alertMessage = error.error.message;
                }
            }
            );

        });
    }

  getAlbum (){
      this._route.params.forEach((params:Params) => {
          let albumId= params ['id'];
          this.album=albumId;
          console.log(albumId);
          this._albumService.getAlbum(this.token, albumId).subscribe(
              response=>{
                this.album=response.album;
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

  albumFileChangeEvent(fileInput: any){
        this.filesToUpload = <File>fileInput.target.files[0];
        console.log(this.filesToUpload)
  }

  onDeleteConfirm (id){
    this.confirmado = id;
}

onCancelAlbum(){
    this.confirmado = null;
}

onDeleteAlbum (id){
    this._albumService.deleteAlbum(this.token, id).subscribe (
    // this._artistService.deleteArtist(this.token, id).subscribe ( 
        response => {
            debugger;
         if(!response.albums){
             alert('Album Borrado con Exito')
         } 
         this.getAlbum();
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