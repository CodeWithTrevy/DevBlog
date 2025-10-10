import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn():boolean{
    
  return !!localStorage.getItem('AccessToken');
}
login(AccessToken:string){
  localStorage.setItem('AccessToken', AccessToken);

}
  logout(){
    localStorage.removeItem('AccessToken');
  }


}
