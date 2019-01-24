import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'user-edit',
  templateUrl: '../views/user-edit.component.html',
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
    public titulo: string;
    public user: User;
    public identity;
    public token;
    public alertMessage;

    constructor(private _userService: UserService) {
        this.titulo = 'Actualizar mis datos';
        // localstorage
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = this.identity;
    }

    ngOnInit(): void {
        console.log('user-edit.component.ts cargado');
    }

    onSubmit() {
        this._userService.update_user(this.user).subscribe(
            response => {
                if (!response.user) {
                    this.alertMessage = 'El usuario no se ha actualizado';
                } else {
                    localStorage.setItem('identity', JSON.stringify(this.user));
                    document.getElementById('identity_name').innerHTML = this.user.name;
                    this.alertMessage = 'Datos actualizados correctamente';
                }
            },
            error => {
                const errorMessage = <any>error;
                if (errorMessage != null) {
                    const body = JSON.parse(error._body);
                    this.alertMessage = body.message;
                    console.log(error);
                }
            }
        );
    }
}
