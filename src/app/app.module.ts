import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './routes/app.routes';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatRippleModule,MatIconModule,MatPaginatorModule,
         MatCardTitle,MatCard,MatCardActions,MatCardSubtitle,MatCardHeader,MatCardContent,MatHeaderRowDef} from '@angular/material';
import { MatFileUploadModule } from 'angular-material-fileupload';
//Modulos de la aplicación
import { AppComponent } from './app.component';
import { updateUserComponent } from './components/user/updateUser.component';
import { registerUserComponent } from './components/user/registerUser.component';
import { artistListComponent } from './components/artists/artistList.component';
import { addArtistComponent } from './components/artists/addArtist.component';
import { editArtistComponent } from './components/artists/editArtist.component';
import { homeComponent } from './components/home/home.component';
import { detailArtistComponent} from './components/artists/detailsArtist.component';
import { addAlbumComponent } from './components/albums/addAlbum.component';
import { albumListComponent } from './components/albums/albumList.component';
import { editAlbumComponent } from './components/albums/editAlbum.component';
import { detailAlbumComponent } from './components/albums/detailsAlbum.component';
import { addSongComponent } from './components/songs/addSong.component';
import { editSongComponent } from './components/songs/editSong.components';


@NgModule({
  declarations: [
    AppComponent,
    updateUserComponent,
    registerUserComponent,
    artistListComponent,
    homeComponent,
    addArtistComponent,
    editArtistComponent,
    detailArtistComponent,
    addAlbumComponent,
    albumListComponent,
    editAlbumComponent,
    detailAlbumComponent,
    addSongComponent,
    editSongComponent,
    
    //modulos de MatIcons
    MatCardTitle,
    MatCard,
    MatCardActions,
    MatCardSubtitle,
    MatCardHeader,
    MatCardContent,
    MatHeaderRowDef
        
  ],
  imports: [
BrowserModule,
    AppRoutingModule,
    FormsModule,
    routing, 
    HttpClientModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,  
    MatRippleModule,
    MatFileUploadModule,
    MatIconModule,
    MatPaginatorModule,
    
    
   
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
