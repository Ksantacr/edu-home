import { Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';

import { registerElement } from 'nativescript-angular';
import { BottomBar, BottomBarItem, TITLE_STATE, SelectedIndexChangedEventData, Notification } from 'nativescript-bottombar';
import { Page } from "tns-core-modules/ui/page";

import {Observable} from 'rxjs';

import { FirebaseService } from "../services/firebase.service";

import { Color } from "color";
//import * as application from "application";
//import * as platform from "platform";
import { UserEduHome } from "../shared/user-eduhome";

//registerElement('BottomBar', () => BottomBar);

@Component({
    selector: "app-main-profesor",
    moduleId: module.id,
    templateUrl: "./main-profesor.component.html"
})
export class MainProfesorComponent implements OnInit {

    //message = "You have successfully authenticated. This is where you build your core application functionality.";

    
    public hidden: boolean;
    public titleState: TITLE_STATE;
    public _bar: BottomBar;
    public inactiveColor: string;
    public accentColor: string;
    public uncoloredBackgroundColor :string;
    //@ViewChild("dockDisplay") dockDisplay: ElementRef;



    public items: Array<BottomBarItem>;
    ngOnInit(): void {
        //this.page.actionBarHidden = true;
        
        /*this.items[0].notification.backgroundColor = "red";
        this.items[0].notification.value = "2";
        this.items[0].notification.textColor = "white";*/
//        this.firebaseService.getCursos

        console.log("Main profesor");
        this.routerExtensions.navigate(["/profesor/home"], { clearHistory: true });
        
    }

    constructor(private routerExtensions:RouterExtensions, private firebaseService:FirebaseService) {

        let mensajes_notificaciones = new Notification("#17375e", "white", "4");
        this.items = [new BottomBarItem(0, "Materias", "book", "#17375e", null),
        new BottomBarItem(1, "Perfil", "student", "#17375e"),
        //new BottomBarItem(2, "Mensajes", "chat", "#17375e")
        //,new BottomBarItem(3, "Notificaciones", "notification", "#17375e", new Notification("#17375e", "white", "4"))
    ]
    }

    tabLoaded(event) {
        this._bar = <BottomBar>event.object;        
        this.hidden = false;
        this.titleState = TITLE_STATE.SHOW_WHEN_ACTIVE;
        this.inactiveColor = "#BBBBBB";
        this.accentColor = "white";
    }
    
     tabSelected(args: SelectedIndexChangedEventData) {
         // only triggered when a different tab is tapped
        if(args.newIndex == 0 ){
            this.routerExtensions.navigate(['/profesor/home'], { clearHistory: true });
        }
        /*if(args.newIndex == 1 ){
            this.routerExtensions.navigate(['/profesor/mensajes'], { clearHistory: true });
        }*/
        if(args.newIndex == 1 ){
            this.routerExtensions.navigate(['/perfil/2'], { clearHistory: true });
        }
     }

     logout() {
        this.firebaseService.logout();
        this.routerExtensions.navigate(["login"] , { clearHistory: true });
    }
}
