import {Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album.models';

@Component ({
    selector:'albumList',
    templateUrl:'../../views/albums/albumList.views.html',
    providers: [UserService,AlbumService]
})

export class albumListComponent implements OnInit {

    public titulo: string;
    public album: Album [];
    public identity;
    public token;
    public url;
    public nextPage;
    public prevPage;
    public alertMessage;

    constructor (
        private _userService:UserService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _albumService:AlbumService
    ){
        this.titulo = 'Listado de Albums';
        this.identity= this._userService.getIdentity();
        this.token= this._userService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit (){
        
        console.log('albumsList.component.ts cargado');

}


}