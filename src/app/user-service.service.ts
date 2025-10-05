import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private usersUrl = 'http://localhost:8080/api/users';

  private authBaseUrl = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) {}

  // GET all users
  public findAll(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/api/users/allUsers');
  }

  // POST add user
  public save(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8080/api/users/addUser', user);
  }

  //handling login for users 
 
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.authBaseUrl, { username, password });
  }
}
