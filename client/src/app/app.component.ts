import { Component, OnInit } from '@angular/core';
import {UserService} from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent implements OnInit {
  public title = 'MUSIFY';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister;

  constructor(
    private _userService: UserService
  ) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
    this.user_register = new User('', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    console.log(this.identity);
    console.log(this.token);
  }

  public onSubmit() {
    this._userService.signup(this.user).subscribe(
      response => {
        const identity = response.user;
        this.identity = identity;

        if (!this.identity._id) {
          alert('El usuario no esta correctamente identificado');
        } else {
          // creamos una session en el LocalStorage
          localStorage.setItem('identity', JSON.stringify(identity));

          // conseguimos el token del usuario para enviarlo en cada peticion http
          this._userService.signup(this.user, 'true').subscribe(
            response => {
              const token = response.token;
              this.token = token;
              if (this.token.length <= 0) {
                alert('El token no se ha generado correctamente');
              } else {
                // creamos un elemento en el localstorage para tener el token disponible
                localStorage.setItem('token', token);
                this.user = new User('', '', '', '', '', 'ROLE_USER', '');
                // console.log(token);
                // console.log(identity);
              }
            },
            error => {
              const errorMessage = <any>error;
              if (errorMessage != null) {
                const body = JSON.parse(error._body);
                this.errorMessage = body.message;
                console.log(error);
              }
            }
          );
        }
      },
      error => {
        const errorMessage = <any>error;
        if (errorMessage != null) {
          const body = JSON.parse(error._body);
          this.errorMessage = body.message;
          console.log(error);
        }
      }
    );
  }

  public logout() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }


  public onSubmitRegister() {
    console.log(this.user_register);

    this._userService.register(this.user_register).subscribe(
      response => {
        const user = response.user;
        this.user_register = user;
        if (!user._id) {
          this.alertRegister = 'Error al registrarse';
        } else {
          this.alertRegister = 'El registro se ha realizado correctamente, identifícate con ' + this.user_register.email;
          this.user_register = new User('', '', '', '', '', 'ROLE_USER', '');
        }
      },
      error => {
        const errorMessage = <any>error;
        if (errorMessage != null) {
          const body = JSON.parse(error._body);
          this.alertRegister = body.message;
          console.log(error);
        }
      }
    );
  }
}
