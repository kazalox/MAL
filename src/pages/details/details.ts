import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ActionSheetController,ToastController} from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import {Anime} from "../../models/anime/anime.model"
import { linkToSegment } from 'ionic-angular/umd/navigation/nav-util';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  anime: Anime;

  constructor(public navCtrl: NavController, public navParams: NavParams,public afDB: AngularFireDatabase,public alertCtrl: AlertController,public actionSheetCtrl: ActionSheetController,public toastCtrl : ToastController) {
  this.anime = navParams.get("data");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }


  changeScanFR(){
    const alert = this.alertCtrl.create({
      title: "Changer l'addresse du lien FR",
      message: "veuillez entrer le nouveau lien",
      inputs: [{
        name: "lienFR",
        placeholder: "Lien scan FR"
      }],
      buttons: [{
          text: "Annuler",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Enregistrer",
          handler: data => {
            this.anime.scanFR = data.lienFR;
            this.updateToFirebase(this.anime.name)
            console.log(data);
          }
        }
      ]
    });
    alert.present();

  }

  changeScanAN(){
    const alert = this.alertCtrl.create({
      title: "Changer l'addresse du lien AN",
      message: "veuillez entrer le nouveau lien",
      inputs: [{
        name: "lienAN",
        placeholder: "Lien scan AN"
      }],
      buttons: [{
          text: "Annuler",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Enregistrer",
          handler: data => {
            this.anime.scanAN = data.lienAN;
            this.updateToFirebase(this.anime.name)
            console.log(data);
          }
        }
      ]
    });
    alert.present();

  }



  changeStream(){
    const alert = this.alertCtrl.create({
      title: "Changer l'addresse du lien streaming",
      message: "veuillez entrer le nouveau lien",
      inputs: [{
        name: "lienStream",
        placeholder: "Lien du stream"
      }],
      buttons: [{
          text: "Annuler",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Enregistrer",
          handler: data => {
            this.anime.streaming = data.lienStream;
            this.updateToFirebase(this.anime.name)
            console.log(data);
          }
        }
      ]
    });
    alert.present();

  }


  changeImage(){
    const alert = this.alertCtrl.create({
      title: "Changer l'addresse du lien de l'image",
      message: "veuillez entrer le nouveau lien",
      
      inputs: [{
        name: "lienImage",
        placeholder: "Lien de l'image"
      }],
      buttons: [{
          text: "Annuler",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Enregistrer",
          handler: data => {
            if (data.lienImage == ""){
              data.lienImage = "http://image.noelshack.com/fichiers/2018/51/4/1545317758-default.jpg";
            }
            this.anime.image = data.lienImage;
            this.updateToFirebase(this.anime.name)
            console.log(data);
          }
        }
      ]
    });
    alert.present();

  }


  updateToFirebase(name: string) {
    const toUpdate = this.afDB.object(`/mal/${name}`);
    toUpdate.update(this.anime);
  }


  deleteAnime(name: String){

    const confirm = this.alertCtrl.create({
      title:'Supprimer cet anime?',
      message:'Estes-vous sûr de vouloir supprimer cet anime?',
      buttons:[
        {
          text: 'NON',
          handler: ()=>{
            console.log('anime non supprimer');
          }
        },
        {
          text:'OUI',
          handler:()=>{
            const toDelete = this.afDB.object(`/mal/${name}`);
            toDelete.remove();
            this.navCtrl.pop();
            console.log('anime supprimer');
            this.showSuccessDelete();
          }
        }
      ]
    });
    confirm.present();                     
  }

  showSuccessDelete(){
    const toast = this.toastCtrl.create({
      message: 'anime was successfully deleted',
      duration:1000
    })
    toast.present();
  }

}
