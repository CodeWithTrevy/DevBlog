import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'posts/:slug', component: PostCardComponent }, 
  { path: '**', redirectTo: '' }
];