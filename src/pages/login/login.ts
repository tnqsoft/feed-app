import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public user_login: string = '';
  public user_password: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public userProvider: UserProvider,
    public events: Events
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToHomePage() {
    // this.navCtrl.push(HomePage);
    this.events.publish('event:user:logined');
    this.navCtrl.setRoot(HomePage);
  }

  login(user_login, user_password) {
    console.log(user_login);
    console.log(user_password);
    if (user_login == '' || user_password == '') {
      this.alertConnexionError();
      return;
    }

    let loading = this.loadingCtrl.create({
      content: 'Loading ...'
    });

    loading.present();

    this.userProvider.login(user_login, user_password).subscribe(token => {
      loading.dismiss();
      // If the user credentials are valid, the current user is redirected to the home page.
      if (token && token != 'undefined') {
        localStorage.setItem('token', token.token);
        this.goToHomePage();

      } else {
        this.alertConnexionError();
      }
    });
  }

  alertConnexionError() {
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: 'Connection refused. Check your login/password.',
      buttons: ['OK']
    });
    alert.present();
  }

}
