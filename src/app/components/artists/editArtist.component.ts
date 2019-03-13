import {Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { Artist } from '../../models/artist.models';
import { ArtistService} from '../../services/artist.service';
import { UploadService } from '../../services/upload.service';

@Component ({
    selector:'editArtist',
    templateUrl:'../../views/artists/addArtist.views.html',
    providers: [UserService, ArtistService,UploadService]
})

export class editArtistComponent implements OnInit {

    public titulo: string;
    public artist: Artist;
    public identity;
    public token;
    public url;
    public alertMessage;
    public isEdit;
    public filesToUpload: File;
    


    constructor (
        private _userService:UserService,
        private _artistService:ArtistService,
        private _uploadService:UploadService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.titulo = 'Editar artista';
        this.identity= this._userService.getIdentity();
        this.token= this._userService.getToken();
        this.url = GLOBAL.url;
        this.artist= new Artist('','','');
        this.isEdit=true;
    }
    

    ngOnInit (){
        console.log('editArtist.component.ts cargado');
        
        //llamar metodo del api para sacar un artista con base a su ID getArtist
        this.getArtist();
}

getArtist (){
    this._route.params.forEach((params: Params) =>{
        let id = params['id'];

        this._artistService.getArtist(this.token, id).subscribe (
            response => {
                if (!response.artist){
                    this._router.navigate(['/']);
                }else {
                    this.artist = response.artist;
                }

            },
            error =>{
                var errorMessage =<any>error;
                    if(errorMessage != null){ 
                    console.log(error);
                    
                // this.alertMessage = error.error.message;
                }
            }
        )
    });
}
     onSubmit (){
        console.log(this.artist);
        this._route.params.forEach((params: Params) =>{
            let id = params['id'];
            this._artistService.updateArtist(this.token,id,this.artist).subscribe (
                response => {
                        if (!response.artist){
                            this.alertMessage='Error en el servidor';
                        }else { 
                            this.alertMessage='El artista se ha actualizado correctamente';

                            //Subir la imagen del artista
                            this._uploadService.imageRequest(this.url+'uploadImageArtist/'+id, [], this.filesToUpload,this.token, 'image')
                                .then(
                                    (response)=> {
                                        this._router.navigate(['/artistsLists',1]);
                                    },(error) =>{
                                        console.log(error);
                                    }
                                );
                            //this._router.navigate(['/artistEdit'], response.artist._id);
                            //this.artist=artist;
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

    artistFileChangeEvent(fileInput: any){
        this.filesToUpload = <File>fileInput.target.files[0];
        console.log(this.filesToUpload)
      }
      
    
}