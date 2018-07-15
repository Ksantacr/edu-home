import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";

import { User } from "../shared/user.model";
//import { UserService } from "../shared/user.service";

import * as localStorage from 'nativescript-localstorage';

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

        this.isLogged = localStorage.getItem('logeado') ? true : false;

        this.user = new User();
        this.user.email = "foo2@foo.com";
        this.user.password = "foo";

        //alert("-->"+this.isLogged);
        if(this.isLogged){
            this.router.navigate(["/test"]);
        }
    }
    
    //@ViewChild("password") password: ElementRef;
    //@ViewChild("confirmPassword") confirmPassword: ElementRef;
   
    //constructor(private page: Page, private userService: UserService, private router: Router) {
    constructor(private page: Page, private router: Router) {
        this.page.actionBarHidden = true;
        
        // this.processing = true;
        //localStorage.setItem('myStorageKey', 'hello there')
    }

    

    submit() {
       /* if (!this.user.email || !this.user.password) {
            this.alert("Please provide both an email address and password.");
            return;
        }*/

        //alert(localStorage.getItem('myStorageKey'));
        //localStorage.setItem('logeado', false)

        this.processing = true;
        this.login();
        /*if (this.isLoggingIn) {
            this.login();
        } else {
            //this.register();
            alert(localStorage.getItem('logeado'));
        }*/
    }

    login() {

        setTimeout(() => {
            this.processing = false;
            //alert(localStorage.getItem('logeado'));
            localStorage.setItem('logeado', true)
            this.router.navigate(["/test"]);
            
            //this.router.navigate(["/(homeTab:home//browseTab:browse//searchTab:search)"]);
        }, 1000);
        

       
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
    /*
    toggleForm() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    register() {
        if (this.user.password != this.user.confirmPassword) {
            this.alert("Your passwords do not match.");
            return;
        }
        this.userService.register(this.user)
            .then(() => {
                this.processing = false;
                this.alert("Your account was successfully created.");
                this.isLoggingIn = true;
            })
            .catch(() => {
                this.processing = false;
                this.alert("Unfortunately we were unable to create your account.");
            });
    }

    forgotPassword() {
        prompt({
            title: "EDUHOME",
            message: "Ingresa tu correo para informarte y seas parte del equipo :)",
            inputType: "email",
            defaultText: "",
            okButtonText: "Guardar",
            cancelButtonText: "Atrás"
        }).then((data) => {
            if (data.result) {
                this.userService.resetPassword(data.text.trim())
                    .then(() => {
                        this.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
                    }).catch(() => {
                        this.alert("Unfortunately, an error occurred resetting your password.");
                    });
            }
        });
    }

    focusPassword() {
        this.password.nativeElement.focus();
    }
    focusConfirmPassword() {
        if (!this.isLoggingIn) {
            this.confirmPassword.nativeElement.focus();
        }
    }*/

    alert(message: string) {
        return alert({
            title: "EduHome",
            okButtonText: "OK",
            message: message
        });
    }
}

