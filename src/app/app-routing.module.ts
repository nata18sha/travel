import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { LocationDetailsComponent } from './pages/location-details/location-details.component';
import { ArticleComponent } from './pages/article/article.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './pages/login/login.component';

import { AdminComponent } from './admin/admin.component';
import { AdminLocationComponent } from './admin/admin-location/admin-location.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'locations', component: LocationsComponent},
  { path: 'location-details/:id', component: LocationDetailsComponent},
  { path: 'blogs', component: BlogsComponent},
  { path: 'article', component: ArticleComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'user', component: UserComponent},
  { path: 'login', component: LoginComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: '/admin-location', pathMatch: 'full' },
    { path: 'admin-location', component: AdminLocationComponent},
    { path: 'admin-blog', component: AdminBlogComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
