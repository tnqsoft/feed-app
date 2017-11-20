import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'
import { IFeed } from '../../models/feed';
import { IFeedItem } from '../../models/feed-item';

/*
  Generated class for the FeedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FeedProvider {

  private baseUrl: string = 'http://feed-api.tnqsoft.com/api/';

  public totalPage: number = 0;
  public totalLimit: number = 0;
  public totalRecord: number = 0;

  constructor(public http: Http, public authHttp: AuthHttp) {
    console.log('Hello FeedProvider Provider');
  }

  public getChannels(): Observable<Array<IFeed>> {
    return this.authHttp.get(`${this.baseUrl}channels`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getArticlesByChannel(channelId: number, page: number): Observable<Array<IFeedItem>> {
    return this.authHttp.get(`${this.baseUrl}channels/${channelId}/articles?page=${page}&limit=15`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getArticles(page: number): Observable<Array<IFeedItem>> {
    return this.authHttp.get(`${this.baseUrl}articles?page=${page}&limit=15`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public trackingArticle(id: number): Observable<any> {
    return this.authHttp.get(`${this.baseUrl}articles/${id}/tracking`)
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
    let headers = res.headers;

    if (headers.get('Data-Total-Page')) {
      this.totalPage = parseInt(headers.get('Data-Total-Page'), 10);
    }

    if (headers.get('Data-Total-Record')) {
      this.totalRecord = parseInt(headers.get('Data-Total-Record'), 10);
    }

    if (headers.get('Data-Limit')) {
      this.totalLimit = parseInt(headers.get('Data-Limit'), 10);
    }
console.log(this.totalPage);
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
