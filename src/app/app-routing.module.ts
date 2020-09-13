import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { LocationDetailsComponent } from './pages/location-details/location-details.component';
import { ArticleComponent } from './pages/article/article.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './pages/about/about.component';

import { UserComponent } from './user/user.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ReservationsComponent } from './user/reservations/reservations.component';

import { AdminComponent } from './admin/admin.component';
import { AdminLocationComponent } from './admin/admin-location/admin-location.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { AdminReservationComponent } from './admin/admin-reservation/admin-reservation.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'locations', component: LocationsComponent},
  { path: 'location-details/:id', component: LocationDetailsComponent},
  { path: 'blogs', component: BlogsComponent},
  { path: 'article/:id', component: ArticleComponent},
  { path: 'about', component: AboutComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'user', component: UserComponent, children: [
    { path: '', redirectTo: 'user-profile', pathMatch: 'full' },
    { path: 'user-profile', component: ProfileComponent},
    { path: 'user-reservations', component: ReservationsComponent},
  ]},
  { path: 'login', component: LoginComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'admin-location', pathMatch: 'full' },
    { path: 'admin-location', component: AdminLocationComponent},
    { path: 'admin-blog', component: AdminBlogComponent},
    { path: 'admin-reservation', component: AdminReservationComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
