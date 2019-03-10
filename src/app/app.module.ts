import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { updateUserComponent } from './components/user/updateUser.component';
import { registerUserComponent } from './components/user/registerUser.component';
import { artistListComponent } from './components/artists/artistList.component';
import { addArtistComponent } from './components/artists/addArtist.component';
import { homeComponent } from './components/home/home.component';
import { routing, appRoutingProviders } from './routes/app.routes';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    updateUserComponent,
    registerUserComponent,
    artistListComponent,
    homeComponent,
    addArtistComponent
        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    routing, 
    HttpClientModule,
    AngularFontAwesomeModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
