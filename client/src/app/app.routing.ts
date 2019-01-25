import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// import user
import {UserEditComponent} from './components/user-edit.component';

// import artist
import {ArtistListComponent} from './components/artist-list.component';
import {ArtistAddComponent} from './components/artist-add.component';
import {ArtistEditComponent} from './components/artist-edit.component';

import {HomeComponent} from './components/home.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'artists/:page', component: ArtistListComponent},
    {path: 'new-artist', component: ArtistAddComponent},
    {path: 'edit-artist/:id', component: ArtistEditComponent},
    {path: 'mis-datos', component: UserEditComponent},
    {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
