import { TestBed, async } from '@angular/core/testing';
import { LoginPage } from '../login/login';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { } from "jasmine";
import { IonicModule, Platform, NavController } from 'ionic-angular/index';
import { IonicStorageModule } from '@ionic/storage';
import { UserService } from "../../services/UserService";

describe('Login Page', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                HttpModule,
                IonicModule.forRoot(LoginPage),
                IonicStorageModule.forRoot()
            ],
            declarations: [
                LoginPage
            ],
            providers: [
                NavController,
                IonicStorageModule,
                UserService
            ]
        });
    });

    it('should create the app', async(() => {
        let fixture = TestBed.createComponent(LoginPage);
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should have as title 'Login page'`, async(() => {
        let fixture = TestBed.createComponent(LoginPage);
        let app = fixture.debugElement.componentInstance;
        console.log(app.title);
        expect(app.title).toEqual('Login page');
    }));

    it('should render "Welcome to the chat!" in a h1 tag', async(() => {
        let fixture = TestBed.createComponent(LoginPage);
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toEqual('Welcome to the chat!');
    }));
});