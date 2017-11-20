import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  public token: string;

  constructor(public jwtHelper: JwtHelper) {
    this.token = localStorage.getItem('token');
  }

  public isTokenExpired(): boolean {
    if (null === this.token) {
      return true;
    }

    return this.jwtHelper.isTokenExpired(this.token);
  }

  public isLogined(): boolean {
    return !this.isTokenExpired();
  }

  public logout(): void {
    localStorage.removeItem('token');
  }

}
