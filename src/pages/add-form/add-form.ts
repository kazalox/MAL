import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';




import {AngularFireDatabase} from "@angular/fire/database";

/**
 * Generated class for the AddFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-form',
  templateUrl: 'add-form.html',
})
export class AddFormPage {

  animeList : Array<Object>;

  anime = {
    
    name: "",
    scanFR: "",
    scanAN: "",
    streaming: "",
    image:""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public toastCtrl: ToastController) {
    db
    .list("mal")
    .valueChanges()
    .subscribe((data) => {
      this.animeList = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFormPage');
  }

   addItem(anime: { name?: any; }) {
  //   var i;
    
  //   for(i=0;i<this.animeList.length;i++){
  //     console.log(anime.name);
  //     console.log(this.animeList[i].name);
  //     if (anime.name == this.animeList[i].name){
  //       this.showToast();
  //       return 0;
  //     }
  //   }


  //setting custom key
  const toSend = this.db.object(`/mal/${anime.name}`);
  //set item into firebase
  toSend.set(anime);
  //go back to home page
  this.navCtrl.pop();

    this.showToastWithCloseButton();
   }




  showToastWithCloseButton(){
    const toast = this.toastCtrl.create({
      message: 'anime was successfully created',
      duration:1000
    })
    toast.present();
  }


showToast(){
    const toast = this.toastCtrl.create({
      message: 'anime already exist',
      duration:1000,
      position: 'middle'
    })
    toast.present();
  }


}



