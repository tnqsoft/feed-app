import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { IFeed } from '../../models/feed';
import { FeedProvider } from '../../providers/feed/feed';
import { IFeedItem } from '../../models/feed-item';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  public channel: IFeed;
  public articles: Array<IFeedItem> = [];
  public page: number = 1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public feedProvider: FeedProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public events: Events
  ) {
    this.channel = navParams.get('channel');
    this.getArticles();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
  }

  public openArticle(article: IFeedItem)
  {
    article.is_read = true;
    let url: string = article.link;
    let loading = this.loadingCtrl.create({
      content: 'Loading ...'
    });
    loading.present();
    this.feedProvider.trackingArticle(article.id).subscribe(() => {
      loading.dismiss();
      this.events.publish('event:article:tracking');
      window.open(url);
    });
  }

  public getArticles() {
    let loading = this.loadingCtrl.create({
      content: 'Loading ...'
    });
    loading.present();
    this.feedProvider.getArticlesByChannel(this.channel.id, this.page).subscribe(articles => {
      loading.dismiss();
      this.articles = articles;
    });
  }

  doRefresh(refresher) {
    this.page = 1;
    this.feedProvider.getArticlesByChannel(this.channel.id, this.page).subscribe(articles => {
      for (let article of articles) {
        this.articles.push(article);
      }
      refresher.complete();
    });
  }

  doInfinite(infiniteScroll) {
    // console.log(this.feedProvider.totalPage);
    // if (this.page >= this.feedProvider.totalPage) {
    //   infiniteScroll.complete();
    //   return;
    // }
    this.page++;
    this.feedProvider.getArticlesByChannel(this.channel.id, this.page).subscribe(articles => {
      for (let article of articles) {
        this.articles.push(article);
      }
      infiniteScroll.complete();
    });
  }

}
