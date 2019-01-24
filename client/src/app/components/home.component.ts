import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
    selector: 'home',
    templateUrl: '../views/home.component.html'
})
export class HomeComponent implements OnInit {
    public titulo: string;

    constructor() {
        this.titulo = 'Artistas';
    }

    ngOnInit(): void {
        console.log('home.component.ts cargado');
        // conseguir el listado de artistas
    }
}
