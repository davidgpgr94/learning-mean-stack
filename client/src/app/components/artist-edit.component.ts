import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
import { UploadService } from '../services/upload.service';
import { GLOBAL } from '../services/global';

import { Artist } from '../models/artist';

@Component({
    selector: 'artist-edit',
    templateUrl: '../views/artist-add.component.html',
    providers: [UserService, ArtistService, UploadService]
})
export class ArtistEditComponent implements OnInit {
    public titulo: string;
    public artist: Artist;
    public identity;
    public token;
    public url: string;
    public alertMessage;
    public is_edit;
    public btn_submit: string;

    public filesToUpload: Array<File>;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService,
        private _uploadService: UploadService
    ) {
        this.titulo = 'Crear nuevo artista';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist('', '', '');
        this.is_edit = true;
        this.btn_submit = 'Editar artista';
    }

    ngOnInit(): void {
        console.log('artist-add.component.ts cargado');
        // Llamar al metodo del api para sacar un artista en base a su id
        this.getArtist();
    }

    onSubmit() {
        console.log(this.artist);
        this._route.params.forEach((params: Params) => {
            const id = params['id'];
            this._artistService.editArtist(this.token, id, this.artist).subscribe(
                response => {
                    if (!response.artist) {
                        this.alertMessage = 'Error en el servidor';
                    } else {
                        this.alertMessage = 'El artista se ha actualizado correctamente';
                        // Subimos la imagen del artista
                        // tslint:disable-next-line:max-line-length
                        this._uploadService.makeFileRequest(this.url + 'upload-image-artist/' + id, [], this.filesToUpload, this.token, 'image')
                            .then(
                            (result) => {
                                this._router.navigate(['/artists', 1]);
                            },
                            (error) => {
                                console.log(error);
                            }
                        );
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

        });



    }

    getArtist() {
        this._route.params.forEach((params: Params) => {
            const id = params['id'];
            this._artistService.getArtist(this.token, id).subscribe(
                response => {
                    if (!response.artist) {
                        this._router.navigate(['/']);
                    } else {
                        this.artist = response.artist;
                    }
                },
                error => {
                    const errorMessage = <any>error;
                    if (errorMessage != null) {
                        const body = JSON.parse(error._body);
                        // this.alertMessage = body.message;
                        console.log(error);
                    }
                }
            );
        });
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }
}
