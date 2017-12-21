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
    user: User;
    title: string = "Login page";

    constructor(public navCtrl: NavController, private storage: Storage, private UserService: UserService) {
        storage.get('user').then((user: User) => {
            if (user) {
                this.user = user;
            }
        });
    }

    submit() {
        this.UserService.createUser(this.user).subscribe((user: User) => {
            this.user = user;
            this.storage.set("user", this.user);
            this.navCtrl.push(RoomsPage);
        });
    }

    ngOnInit() {
        this.user = new User();
    }
}
