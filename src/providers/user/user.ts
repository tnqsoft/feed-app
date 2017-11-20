import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Response, Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  private baseUrl = 'http://feed-api.tnqsoft.com/api/';

  constructor(public http: Http, public authHttp: AuthHttp) {
    console.log('Hello UserProvider Provider');
  }

  login(user_login, user_password): Observable<any> {
    let requestBody = {
      username: user_login,
      password: user_password
    };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({
      headers: headers
    });

    return this.http.post(`${this.baseUrl}admin/login`, requestBody, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Extracting data.
   *
   * @param res
   * @returns {any|{}}
   */
  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  /**
   * Handling errors.
   *
   * @param error
   * @returns {ErrorObservable}
   */
  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
