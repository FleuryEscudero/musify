import {Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { Artist } from '../../models/artist.models';
import { ArtistService} from '../../services/artist.service';

@Component ({
    selector:'addArtist',
    templateUrl:'../../views/artists/addArtist.views.html',
    providers: [UserService, ArtistService]
})

export class addArtistComponent implements OnInit {

    public titulo: string;
    public artist: Artist ;
    public identity;
    public token;
    public url;
    public alertMessage;
    public filesToUpload: Array<File>;

    constructor (
        private _userService:UserService,
        private _artistService:ArtistService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.titulo = 'Añadir artista';
        this.identity= this._userService.getIdentity();
        this.token= this._userService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist ('','','');
    }
    

    ngOnInit (){
        console.log('addArtist.component.ts cargado');
        
        //conseguir Listado de artistas
}


    public onSubmit (){
        console.log(this.artist);
        this._artistService.addArtist(this.token,this.artist).subscribe (
            response => {
                console.log(response);
                let artist = response.artist;
                localStorage.setItem('token', JSON.stringify(this.token));
                this.artist=artist;
                console.log(this.filesToUpload);
                if (!this.filesToUpload){
                    alert ('La imagen del artista no es valida')
                }else {
                    //esperar al curso
                }

                if(!artist._id){
                    alert('Error al registrar el artista');
                    this.alertMessage = "Error al registrar el artista"
                }else {
                    this.alertMessage = "El artista fue registraod de manera correcta";
                    this.artist = new Artist ('','','');
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
    }

    artistFileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload)
      }
      
    artistImageRequest(url: string, params: Array<string>, files: Array<File>){
        let token = this.token;
        return new Promise (function(resolve, reject){
        var formData: any = new FormData();
        var xhr = new XMLHttpRequest();
    
        for (var i = 0; i >files.length; i++){
            formData.append('image', files [i], files[i].name);
        }
    
        xhr.onreadystatechange = function (){
            if(xhr.readyState ==4){
                if(xhr.status==200){
                    resolve(JSON.parse(xhr.response));
                }else{
                    reject(xhr.response);
                }
            }
        }
        }
        )
    }
}