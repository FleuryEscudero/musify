import { ModuleWithProviders} from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

/*Importar Componentes*/

import { artistListComponent } from '../components/artists/artistList.component';
import { registerUserComponent } from '../components/user/registerUser.component';
import { updateUserComponent } from '../components/user/updateUser.component';
import { homeComponent } from '../components/home/home.component';
import { addArtistComponent } from '../components/artists/addArtist.component';
import { editArtistComponent } from '../components/artists/editArtist.component';
import { detailArtistComponent} from '../components/artists/detailsArtist.component';
import { addAlbumComponent} from '../components/albums/addAlbum.component';
import { albumListComponent } from '../components/albums/albumList.component';
import { editAlbumComponent } from '../components/albums/editAlbum.component';
import { detailAlbumComponent } from '../components/albums/detailsAlbum.component';
import { addSongComponent } from '../components/songs/addSong.component';
import { editSongComponent } from '../components/songs/editSong.component';

import { AppComponent } from 'src/app/app.component';




/*Crear las Rutas de los componentes */

const appRoutes:Routes = [
    {path:'', component:homeComponent},
    {path:'updateUser', component:updateUserComponent},
    {path:'registerUser', component:registerUserComponent},
    {path:'artistsLists/:page', component:artistListComponent},
    {path:'addArtist', component:addArtistComponent},
    {path:'editArtist/:id', component:editArtistComponent},
    {path:'detailArtist/:id', component:detailArtistComponent},
    {path:'newAlbum/:artist', component:addAlbumComponent},
    {path:'albumList/', component:albumListComponent},
    {path:'editAlbum/:id', component:editAlbumComponent},
    {path:'detailsAlbum/:id',component:detailAlbumComponent},
    {path:'addSong/:id', component:addSongComponent},
    {path:'editSong/:id', component:editSongComponent},
    {path:'**', component:artistListComponent}

]

/**Exportar las constantes para activar el ruteo de angular */

export const appRoutingProviders: any []= [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

