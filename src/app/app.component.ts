import { Component,OnInit } from '@angular/core';
import { User } from './models/user.models';
import { UserService } from './services/user.service';
import { GLOBAL } from './services/global';
import {Router, ActivatedRoute} from '@angular/router'; 




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [
    UserService
  ]
})

export class AppComponent implements OnInit {
  public title = 'Musify';
  public user: User;
  // Se guardaran en el localStorage para estar pasando dentro de la applicacion
  public identity;
  public token;
  public errorMessage;
  public filesToUpload;
  public url;

  constructor(
    private _userService:UserService, 
    private _route: ActivatedRoute,
    private _router: Router
    
  ){
    this.user = new User('','','','','','ROLE_USER','');
    this.identity= this._userService.getIdentity();
    this.token= this._userService.getToken();
    this.url = GLOBAL.url;
   
  }

  ngOnInit(){

    //Esto sirve apra que cuando cargue la pagina la sesion se mantenga abierta por la identidad del usuario y el token de la sesion dentro de la 
    //memoria virtual

    

    console.log(this.identity);
    console.log(this.token);

  }
  
  public onSubmit (){
    console.log(this.user);
    this._userService.login(this.user).subscribe(
      response => {
        console.log(response);
        //conseguir los datos del usuario identificado
        let identity = response.user;
        this.identity = identity;
        if(!this.identity._id){
          console.log(!identity)
          alert("El usuario no esta identificado");
        }else {
          // Crear elemento en localStorage para tener el usuario en sesion

          localStorage.setItem('identity',JSON.stringify(identity));


          //Conseguir el token para enviarselo a cada peticion HTTP

            this._userService.login(this.user,'true').subscribe(
              response => {
                console.log(response);
                //conseguir los datos del usuario identificado
                let token = response.token;
                this.token = token;
                if(this.token.length <= 0 ){
                  alert("El token no se ha generado");
                }else {
                  // Crear elemento en localStorage para tener el token en sesion
        
                  localStorage.setItem('token',token);

                  console.log(token);
                  console.log(identity);   
                  
                }
              },
              error =>{
                  var errorMessage =<any>error;
                    if(errorMessage != null){ 
                    console.log(error);
                    
                    this.errorMessage = error.error.message;
                    }
                
            }
            );

        }
        
      },
      error =>{
        var errorMessage =<any>error;
        if(errorMessage != null){ 
        console.log(error);
        
        this.errorMessage = error.error.message;
        }
      }  
    
    );
  }

  logout (){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity=null;
    this.token=null;

  }

  getUrl()
  {
    return "url('./assets/musifyBackground.jpg')";
  }

  clickRegister (){
    this._router.navigate(['/registerUser']);
  }

  
}
