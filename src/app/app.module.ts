import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { LocationDetailsComponent } from './pages/location-details/location-details.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { ArticleComponent } from './pages/article/article.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './user/user.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { AdminComponent } from './admin/admin.component';
import { AdminLocationComponent } from './admin/admin-location/admin-location.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LocationsComponent,
    BlogsComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    AdminLocationComponent,
    AdminBlogComponent,
    ArticleComponent,
    LocationDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule, 
    AngularSvgIconModule.forRoot(),
    FormsModule,
    NgImageSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
