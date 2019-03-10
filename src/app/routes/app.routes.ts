import { ModuleWithProviders} from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

/*Importar Componentes*/

import { artistListComponent } from '../components/artists/artistList.component';
import { registerUserComponent } from '../components/user/registerUser.component';
import { updateUserComponent } from '../components/user/updateUser.component';
import { homeComponent } from '../components/home/home.component';
import { addArtistComponent } from '../components/artists/addArtist.component';
import { AppComponent } from 'src/app/app.component';


/*Crear las Rutas de los componentes */

const appRoutes:Routes = [
    {path:'', component:homeComponent},
    {path:'updateUser', component:updateUserComponent},
    {path:'registerUser', component:registerUserComponent},
    {path:'artistsLists/:page', component:artistListComponent},
    {path:'addArtist', component:addArtistComponent},
    {path:'**', component:artistListComponent}
]

/**Exportar las constantes para activar el ruteo de angular */

export const appRoutingProviders: any []= [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

