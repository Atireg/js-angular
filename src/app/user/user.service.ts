import { Injectable } from '@angular/core';
import { UserForAuth } from '../types/user';
import { BehaviorSubject,tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user$$ = new BehaviorSubject< UserForAuth | null >(null);
  private user$ = this.user$$.asObservable();
  USER_KEY = '[user]';

  user: UserForAuth | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    
  }

  login(email: string, password: string) {
    return this.http
    .post<UserForAuth>('/api/login', { email, password })
    .pipe(tap((user) => this.user$$.next(user)))
  };

  register(username: string, email: string, password: string, rePassword: string){
    return this.http
    .post<UserForAuth>('/api/register', { username, email, password, rePassword })
    .pipe(tap((user) => this.user$$.next(user)))
  };

  getProfile(){
    return this.http
    .get<UserForAuth>('/api/users/profile')
    .pipe(tap((user) => this.user$$.next(user)))
  }

  logout() {
    return this.http
    .post<UserForAuth>('/api/logout', {})
    .pipe(tap((user) => this.user$$.next(null)))
  };

}
