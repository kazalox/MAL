import { Component } from '@angular/core';
import { NavController, ToastController, AlertController,ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';

import { AddFormPage } from "../../pages/add-form/add-form";
import {DetailsPage} from "../../pages/details/details";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})




export class HomePage {

  


animeList : Array<Object>;

descending: boolean = false;
order: number;
column: string = 'name';


  constructor(public navCtrl: NavController, public db : AngularFireDatabase, public afDB: AngularFireDatabase,public alertCtrl: AlertController,public actionSheetCtrl: ActionSheetController,public toastCtrl : ToastController) {
  
    db
    .list("mal")
    .valueChanges()
    .subscribe((data) => {
      this.animeList = data;

   

     });




  }

  newAnime(){
    this.navCtrl.push(AddFormPage);
  }


  animeSelected(anime: Object) {
    this.navCtrl.push(DetailsPage,{data : anime})

  }

  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
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
            //this.navCtrl.pop();
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


  getImage(anime: Object){
    console.log(anime)
    
  }

  


 

}
