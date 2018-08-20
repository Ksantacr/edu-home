import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter} from "@angular/core";

//import * as localStorage from 'nativescript-localstorage';
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';

//import { registerElement } from 'nativescript-angular';
import { BottomBar, BottomBarItem, TITLE_STATE, SelectedIndexChangedEventData, Notification } from 'nativescript-bottombar';
//import { Page } from "tns-core-modules/ui/page/page";
import { Page } from "tns-core-modules/ui/page";
//import { Page } from "ui/page";

import {Observable} from 'rxjs';

import { FirebaseService } from "../services/firebase.service";

import { Color } from "color";
import * as application from "application";
import * as platform from "platform";
import { UserEduHome } from "../shared/user-eduhome";

//registerElement('BottomBar', () => BottomBar);

@Component({
    selector: "app-main",
    moduleId: module.id,
    templateUrl: "./main.component.html"
})
export class MainComponent implements OnInit {

    //message = "You have successfully authenticated. This is where you build your core application functionality.";

    
    public hidden: boolean;
    public titleState: TITLE_STATE;
    public _bar: BottomBar;
    public inactiveColor: string;
    public accentColor: string;
    public uncoloredBackgroundColor :string;
    //@ViewChild("dockDisplay") dockDisplay: ElementRef;

    


    public items: Array<BottomBarItem>;

    public ngAfterViewInit() {
        this.routerExtensions.navigate(["/main/home"], { clearHistory: true });
    }
    ngOnInit(): void {
        //this.page.actionBarHidden = true;
        
        /*this.items[0].notification.backgroundColor = "red";
        this.items[0].notification.value = "2";
        this.items[0].notification.textColor = "white";*/
//        this.firebaseService.getCursos
        //this.routerExtensions.navigate(["/main/home"], { clearHistory: true });
        
    }

    constructor(private routerExtensions:RouterExtensions, private firebaseService:FirebaseService) {

        //this.items[0].notification = new Notification("#17375e", "white", "4"); 
        let mensajes_notificaciones = new Notification("#17375e", "white", "4");
        this.items = [
            new BottomBarItem(0, "Materias", "book", "#17375e"),
        new BottomBarItem(1, "Mensajes", "chat", "#17375e"),
        new BottomBarItem(2, "Perfil", "student", "#17375e")
        //,new BottomBarItem(3, "Notificaciones", "notification", "#17375e", new Notification("#17375e", "white", "4"))
        ]
    }

    
    

    tabLoaded(event) {
        this._bar = <BottomBar>event.object;
        
        this.hidden = false;
        this.titleState = TITLE_STATE.ALWAYS_SHOW;
        this.inactiveColor = "#BBBBBB";
        this.accentColor = "white";

    }
    
     tabSelected(args: SelectedIndexChangedEventData) {
         
         // only triggered when a different tab is tapped
        if(args.newIndex == 0 ){
            this.routerExtensions.navigate(['/main/home'], { clearHistory: true });
        }
        if(args.newIndex == 1 ){
            console.log("MAIN MENSAJES")
            this.routerExtensions.navigate(['/main/mensajes'], { clearHistory: true });
        }
        if(args.newIndex == 2 ){
            this.routerExtensions.navigate(['/main/perfil/1']);
        }
     }

     
}
