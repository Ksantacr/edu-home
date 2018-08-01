import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { Page } from "tns-core-modules/ui/page";
import { BackendService } from "../services/backend.service";

@Component({
    selector: "app-login-redirect",
    moduleId: module.id,
    templateUrl: "./login-redirect.component.html",
    styleUrls: ['./login-redirect.component.css']
})
export class LoginRedirectComponent implements OnInit{

    processing:boolean = false;
    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.processing = true;

        setTimeout(()=>{

            console.log("Login Redirect")
            this.processing = false;
            //this.routerExtensions.navigate(["main"] , { clearHistory: true });

            if(BackendService.isProfesor()){
                this.routerExtensions.navigate(["profesor"] , { clearHistory: true });
            }else if(BackendService.isRepresentante()){
                this.routerExtensions.navigate(["main"] , { clearHistory: true });
            }else {
                this.routerExtensions.navigate(["login"] , { clearHistory: true });
            }
            //this.routerExtensions.navigate(["main"] , { clearHistory: true });
        }, 1500);
    }
    constructor(private page: Page,
        private routerExtensions: RouterExtensions) {
        
    }
}

