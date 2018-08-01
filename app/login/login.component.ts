import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
//import { Router } from "@angular/router";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
//import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
//import { Page } from "ui/page";

//import {Observable} from 'rxjs';
import { User } from "../shared/user.model";
//import { UserService } from "../shared/user.service";

//import * as localStorage from 'nativescript-localstorage';
import {FirebaseService} from "../services/firebase.service";
import { BackendService } from "~/services/backend.service";

@Component({
    selector: "app-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

    user: User;
    processing = false;
    //isLoggingIn = true;
    ngOnInit(): void {

        this.user = new User();
        this.user.email = "demo@eduhome.com";
        this.user.password = "eduhom3";
        this.page.actionBarHidden = true;

    }
    @ViewChild("profesor") profesorCheckBox: ElementRef;
    
    @ViewChild("password") password: ElementRef;
    //@ViewChild("confirmPassword") confirmPassword: ElementRef;
   
    //constructor(private page: Page, private userService: UserService, private router: Router) {
    constructor(private page: Page, private firebaseService: FirebaseService,
        private routerExtensions: RouterExtensions) {
        //this.page.actionBarHidden = true; 
    }
    submit() {
        console.log("SUBMIT")
        this.processing = true;

        
        if(this.profesorCheckBox.nativeElement.checked) {
            console.log("checked");
            this.loginProfesor();
        }else {
            this.login();
        }
        //this.login();     
    }
    loginProfesor() {

        this.firebaseService.loginProfesor(this.user)
            .then(() => {

                console.log("Login profesor")

                this.processing = false;
                //loginRedirect
                this.routerExtensions.navigate(["/profesor"] , { clearHistory: true });
            })
            .catch(() => {
                this.processing = false;
                alert("No hemos encontrado tu cuenta.");
        });

    }
    login() {
        this.firebaseService.login(this.user)
            .then(() => {
                this.processing = false;
                //if(BackendService.isProfesor() || BackendService.isRepresentante())
                    this.routerExtensions.navigate(["/main"] , { clearHistory: true });
            }, () => {
                alert("Verifica tu conexión a internet.");
            })
            .catch(() => {
                this.processing = false;
                //this.routerExtensions.navigate(["login"] , { clearHistory: true });
                alert("No hemos encontrado tu cuenta.");
        });
    }

    focusPassword() {
        this.password.nativeElement.focus();
    }
}

