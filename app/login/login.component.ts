import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
//import { Router } from "@angular/router";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import {Observable} from 'rxjs';
import { User } from "../shared/user.model";
//import { UserService } from "../shared/user.service";

//import * as localStorage from 'nativescript-localstorage';
import {FirebaseService} from "../services/firebase.service";

@Component({
    selector: "app-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

    isLogged:boolean = false;
    user: User;
    processing = false;

    @ViewChild("page") loginPage: ElementRef;

    ngOnInit(): void {
        //throw new Error("Method not implemented.");

        //this.isLogged = localStorage.getItem('logeado') ? true : false;

        this.user = new User();
        this.user.email = "demo@eduhome.com";
        this.user.password = "eduhom34";

    }
    
    //@ViewChild("password") password: ElementRef;
    //@ViewChild("confirmPassword") confirmPassword: ElementRef;
   
    //constructor(private page: Page, private userService: UserService, private router: Router) {
    constructor(private page: Page, private firebaseService: FirebaseService,
        private routerExtensions: RouterExtensions) {
        this.page.actionBarHidden = true;      
       
    }

    submit() {
        this.processing = true;
        setTimeout(()=>{
            
            this.login();
        }, 1000)
        

    }

    login() {
        this.processing = false;
        //this.routerExtensions.navigate(["main"]);
        this.routerExtensions.navigate(["main"], { clearHistory: true } );
       
        /*this.userService.login(this.user)
            .then(() => {
                this.processing = false;
                this.router.navigate(["/home"]);
            })
            .catch(() => {
                this.processing = false;
                this.alert("Unfortunately we could not find your account.");
        });*/
    }
}

