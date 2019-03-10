import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.models';



@Component ({
    selector: 'registerUser',
    templateUrl: '../../views/user/registerUser.views.html',
    providers: [
        UserService
    ]
})

export class registerUserComponent implements OnInit {

    public user: User;
    public alertRegister;
    
        

    constructor(
       
        private _userService:UserService
        
      ){
       
        this.user = new User('','','','','','ROLE_USER','');
       
      }
    
      ngOnInit (){
       
        console.log('registerUserComponent.ts cargado');
    }

    public onSubmit (){
        console.log(this.user);
        this._userService.register(this.user).subscribe (
          response => {
            console.log(response);
            let user = response.user;
            this.user=user;
    
            if (!user._id){
              alert ('Error al registrarse');
              this.alertRegister = "Error al registrarse";
            }else {
              this.alertRegister = "El registro se ha realizado correctamente, para " +
                                    "loguearse ingresa tu usuario con: " + this.user.email;
                                    this.user = new User('','','','','','ROLE_USER','');
            }
          },
          error => {
            var errorMessage =<any>error;
            if(errorMessage != null){ 
            console.log(error);
            
            this.alertRegister = error.error.message;
            }
          }
        );
      }
}

