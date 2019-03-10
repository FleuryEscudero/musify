import {UserService} from '../../services/user.service';
import { User } from '../../models/user.models';
import {GLOBAL} from '../../services/global';
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';


@Component ({
    selector: 'home',
    templateUrl: '../../views/home/home.views.html',
    providers: [
    UserService
    ]
})

export class homeComponent implements OnInit {
    public titulo="Bienvenido a Musify";
    public user:User;
    public identity;
    public token;
    public url: string;

    constructor (

        private _userService: UserService

    ){
        this.token= this._userService.getToken();
        this.identity= this._userService.getIdentity();
        this.user = this.identity;
        this.url=GLOBAL.url;
    }

    ngOnInit (){
        console.log('homeComponent.ts cargado');
    }

}

