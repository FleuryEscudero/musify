import {Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { Artist } from '../../models/artist.models';
import { ArtistService} from '../../services/artist.service';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album.models';



@Component ({
    selector:'detailArtist',
    templateUrl:'../../views/artists/detailArtist.views.html',
    providers: [UserService, ArtistService,AlbumService]
})

export class detailArtistComponent implements OnInit {

    public titulo: string;
    public artist: Artist;
    public album: Album;
    public albums: Album[];
    public identity;
    public token;
    public url;
    public alertMessage;
    


    constructor (
        private _userService:UserService,
        private _artistService:ArtistService,
        private _albumService:AlbumService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.titulo = 'Editar artista';
        this.identity= this._userService.getIdentity();
        this.token= this._userService.getToken();
        this.url = GLOBAL.url;
  
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

                    //sacar los albums del artista
                    this._albumService.getAlbums(this.token, response.artist._id).subscribe(
                        response =>{
                                this.alertMessage="Este artista no tiene albums";
                            if (!response.albums){

                            }else {
                                this.albums= response.albums;
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
    

   
      
    
}