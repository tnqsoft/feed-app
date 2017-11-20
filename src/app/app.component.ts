import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { FeedProvider } from '../providers/feed/feed';
import { IFeed } from '../models/feed';
import { AuthProvider } from '../providers/auth/auth';
import { FeedPage } from '../pages/feed/feed';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;

  public channels: Array<IFeed> = [];

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public feedProvider: FeedProvider,
    public authProvider: AuthProvider,
    public events: Events
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [];
    // this.pages = [
    //   { title: 'Home', component: HomePage },
    //   { title: 'List', component: ListPage },
    //   { title: 'Login', component: LoginPage }
    // ];
    this.events.subscribe('event:user:logined', () => {
      this.getChannels();
    })

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (this.authProvider.isLogined()) {
        // if (localStorage.getItem('token') != '' && localStorage.getItem('token')) {
        this.getChannels();
        this.rootPage = HomePage;
      } else {
        this.logout();
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // openPage(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page.component);
  // }
  public logout() {
    this.authProvider.logout();
    this.rootPage = LoginPage;
  }

  public getFeed(channel) {
    this.nav.push(FeedPage, {
      channel: channel
    });
  }

  public getChannels() {
    this.feedProvider.getChannels().subscribe(channels => {
      this.channels = channels;
    });
  }
}
