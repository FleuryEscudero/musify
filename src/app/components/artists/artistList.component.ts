import {Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { Artist } from '../../models/artist.models';

@Component ({
    selector:'artistList',
    templateUrl:'../../views/artists/artistsList.views.html',
    providers: [UserService]
})

export class artistListComponent implements OnInit {

    public titulo: string;
    public artists: Artist [];
    public identity;
    public token;
    public url;

    constructor (
        private _userService:UserService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.titulo = 'Artistas';
        this.identity= this._userService.getIdentity();
        this.token= this._userService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit (){
        console.log('artistsList.component.ts cargado');

        //conseguir Listado de artistas
}

public getArtistList (artists){

}

}