import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ChatPage } from '../pages/chat/chat';
import { RoomsPage } from '../pages/rooms/rooms';
import { LoginPage } from '../pages/login/login';

import { UserService } from "../services/UserService";
import { MessageService } from "../services/MessageService";
import { RoomService } from "../services/RoomService";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:8082', options: {} };

@NgModule({
  declarations: [
    MyApp,
    RoomsPage,
    LoginPage,
    ChatPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {}, {
      links: [
        { component: LoginPage, name: 'Login', segment: 'login' },
        { component: RoomsPage, name: 'Rooms', segment: 'rooms' },
        { component: ChatPage, name: 'Chat', segment: 'chat' },
      ]
    }),
    IonicStorageModule.forRoot(),
    HttpModule,
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RoomsPage,
    LoginPage,
    ChatPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserService,
    MessageService,
    RoomService,
    Storage
  ]
})
export class AppModule { }
