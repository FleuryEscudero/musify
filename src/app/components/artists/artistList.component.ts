import {Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { Artist } from '../../models/artist.models';
import { ArtistService } from '../../services/artist.service';

@Component ({
    selector:'artistList',
    templateUrl:'../../views/artists/artistsList.views.html',
    providers: [UserService,ArtistService]
})

export class artistListComponent implements OnInit {

    public titulo: string;
    public artists: Artist [];
    public identity;
    public token;
    public url;
    public nextPage;
    public prevPage;
    public alertMessage;
    public page;

    constructor (
        private _userService:UserService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _artistService:ArtistService
    ){
        this.titulo = 'Artistas';
        this.identity= this._userService.getIdentity();
        this.token= this._userService.getToken();
        this.url = GLOBAL.url;
        this.prevPage=1;
        this.nextPage=1;
    }

    ngOnInit (){
        console.log('artistsList.component.ts cargado');

        //conseguir Listado de artistas
        this._route.params.subscribe(params => {
            this.page = +params['page'];
            if(!this.page){
                this.page = 1;
            }else{
                this.nextPage = ++ this.page + 1;
                this.prevPage = -- this.page - 1;
                if(this.prevPage == 0){
                    this.prevPage = 1;
                }
            }
            this.getArtistsList();
        });
}

 getArtistsList (){
     //debugger;
    this._route.params.forEach((params: Params) =>{
        let page = + params['page'];
        if (!page){
            page = 1
        }else{
            this.nextPage = page +1;
            this.prevPage = page -1;
            if(this.prevPage==0){
                this.prevPage=1;
            }
        }

        this._artistService.getArtists(this.token, page).subscribe(
            response => {
                if (!response.artists){
                    this._router.navigate(['/']);
                }else {
                    this.artists = response.artists;
                }

            },
            error =>{
                var errorMessage =<any>error;
                    if(errorMessage != null){ 
                    console.log(error);
                    
                // this.alertMessage = error.error.message;
                }
            }
        );
    });
}


public confirmado;

onDeleteConfirm (id){
    this.confirmado = id;
}

onCancelArtist(){
    this.confirmado = null;
}

onDeleteArtist (id){
    this._artistService.deleteArtist(this.token, id).subscribe ( 
        response => {
         if(!response.artists){
             alert('Artista Borrado con Exito')
         } 
         this.getArtistsList();
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