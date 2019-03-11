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
import { editArtistComponent } from './components/artists/editArtist.component';
import { homeComponent } from './components/home/home.component';
import { routing, appRoutingProviders } from './routes/app.routes';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatRippleModule,MatIconModule,MatPaginatorModule,
         MatCardTitle,MatCard,MatCardActions,MatCardSubtitle,MatCardHeader,MatCardContent} from '@angular/material';
import { MatFileUploadModule } from 'angular-material-fileupload';
@NgModule({
  declarations: [
    AppComponent,
    updateUserComponent,
    registerUserComponent,
    artistListComponent,
    homeComponent,
    addArtistComponent,
    editArtistComponent,
    MatCardTitle,
    MatCard,
    MatCardActions,
    MatCardSubtitle,
    MatCardHeader,
    MatCardContent
        
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
