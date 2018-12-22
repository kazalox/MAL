import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailsPage} from '../pages/details/details';
import { AddFormPage} from '../pages/add-form/add-form';

import { SearchPipe } from '../pipes/search/search';
import { SortPipe } from '../pipes/sort/sort';

import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule,AngularFireDatabase} from '@angular/fire/database';


//fire base
export const config = {
  apiKey: "AIzaSyCmnGePXrR9KXKmiaG-OJyzLYwFm20XUUo",
  authDomain: "malbase-5d448.firebaseapp.com",
  databaseURL: "https://malbase-5d448.firebaseio.com",
  projectId: "malbase-5d448",
  storageBucket: "",
  messagingSenderId: "187701307105"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage,
    AddFormPage,
    SearchPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage,
    AddFormPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
