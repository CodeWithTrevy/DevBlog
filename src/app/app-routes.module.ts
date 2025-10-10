import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';

import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { PostCreatorComponent } from './components/post-creator/post-creator.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {path: 'post',component: PostCreatorComponent},

 
  { path: '**', redirectTo: '' }
];