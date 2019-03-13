import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.models';
import { GLOBAL } from '../../services/global';




@Component ({
    selector: 'updateUser',
    templateUrl: '../../views/user/updateUser.views.html',
    providers: [
        UserService
    ]
})

export class updateUserComponent implements OnInit {
    public titulo="Actualizar mis datos";
    public user:User;
    public identity;
    public token;
    public alertUpdate;
    //public filesToUpload: Array<File>;
    public filesToUpload: File;
    public url: string;


    constructor (
        
        private _userService: UserService
    ){
        
        this.identity

        //LocalStorage
        this.token= this._userService.getToken();
        this.identity= this._userService.getIdentity();
        this.user = this.identity;
        this.url=GLOBAL.url;
    }



    ngOnInit (){
       
        console.log('updateUserComponent.ts cargado');
    }

    public onSubmit (){
       
        console.log(this.user);
        this._userService.updateUser(this.user).subscribe(
            response => {
                //debugger;
                if (!response.user){
                    alert ('Error al resistrarse');
                    this.alertUpdate = "Error al actualziar";
                }else {
                        
                        //this.user = response.user;
                        localStorage.setItem('identity', JSON.stringify(this.user));
                        document.getElementById("identityName").innerHTML=this.user.name + ' ' + this.user.surname;
                        console.log(this.filesToUpload);
                    if (!this.filesToUpload){
                        //Redireccion
                    }else{
                        // debugger;
                        this.imageRequest(this.url+'uploadImage/'+this.user._id,[],this.filesToUpload).then(
                            (result:any)=>{
                                this.user.image=result.image;
                                console.log(result.image);
                                localStorage.setItem('identity', JSON.stringify(this.user));
                                console.log(this.user);
                            }
                        ).catch (e =>{
                            console.log(e);
                        });
                    }
                    this.alertUpdate ="El usuario ha sido actualizado"; 
                }

            },
            error =>{
                var errorMessage =<any>error;
        if(errorMessage != null){ 
        console.log(error);
        
        this.alertUpdate = error.error.message;
        }
            }
        );
    }

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <File>fileInput.target.files[0];
        console.log(this.filesToUpload)
      }
      
    imageRequest(url: string, params: Array<string>, file: File){
        let token = this.token;
        return new Promise (function(resolve, reject){
        var formData: any = new FormData();
        var xhr = new XMLHttpRequest();
    
        /*for (var i = 0; i >files.length; i++){
            formData.append('image', files[i], files[i].name);
        }*/
        formData.append('image', file, file.name);
    
        xhr.onreadystatechange = function (){
            if(xhr.readyState ==4){
                if(xhr.status==200){
                    resolve(JSON.parse(xhr.response));
                    console.log(xhr.response);
                }else{
                    reject(xhr.response);
                }
            }
        }
        xhr.open('POST',url,true);
        xhr.setRequestHeader('Authorization',token);
        xhr.send(formData);
        }
        );
    }

        
}