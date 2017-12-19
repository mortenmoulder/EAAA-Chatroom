import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RoomsPage } from '../rooms/rooms';

import { Storage } from '@ionic/storage';

import { User } from "../../models/User";
import { UserService } from "../../services/UserService";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})

export class LoginPage {
    roomsPage = RoomsPage;
    navController: NavController;
    appStorage: Storage;
    user: User;
    userService: UserService;

    constructor(public navCtrl: NavController, private storage: Storage, private UserService: UserService) {
        this.navController = navCtrl;
        this.appStorage = storage;
        this.userService = UserService;

        storage.get('user').then((user: User) => {
            if (user) {
                this.user = user;
            }
        });
    }

    submit() {
        this.userService.createUser(this.user).subscribe((user: User) => {
            this.user = user;
            this.appStorage.set("user", this.user);
            this.navController.push(RoomsPage);
        });
    }

    ngOnInit() {
        this.user = new User();
    }
}
