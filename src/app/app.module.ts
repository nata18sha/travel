import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { QuillModule } from 'ngx-quill';
import { OrderModule } from 'ngx-order-pipe';
// import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
import { LazyLoadImageModule } from 'ng-lazyload-image';



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
import { AboutComponent } from './pages/about/about.component';

import { UserComponent } from './user/user.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ReservationsComponent } from './user/reservations/reservations.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { AdminComponent } from './admin/admin.component';
import { AdminLocationComponent } from './admin/admin-location/admin-location.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { AdminReservationComponent } from './admin/admin-reservation/admin-reservation.component';
import { SearchLocationPipe } from './shared/pipes/search-location.pipe';
import { SearchReservationPipe } from './shared/pipes/search-reservation.pipe';
import { SearchBlogPipe } from './shared/pipes/search-blog.pipe';




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
    LocationDetailsComponent,
    AdminReservationComponent,
    ProfileComponent,
    ReservationsComponent,
    SearchLocationPipe,
    SearchReservationPipe,
    AboutComponent,
    SearchBlogPipe
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
    NgImageSliderModule,  
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    QuillModule.forRoot(),
    ReactiveFormsModule,
    OrderModule,
    LazyLoadImageModule
    // LazyLoadImagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
