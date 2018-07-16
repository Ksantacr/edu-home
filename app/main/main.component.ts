import { Component, OnInit } from "@angular/core";

import * as localStorage from 'nativescript-localstorage';
import { Router } from "@angular/router";

import { registerElement } from 'nativescript-angular';
import { BottomBar, BottomBarItem, TITLE_STATE, SelectedIndexChangedEventData, Notification } from 'nativescript-bottombar';
import { Page } from "tns-core-modules/ui/page/page";

registerElement('BottomBar', () => BottomBar);


@Component({
    selector: "app-main",
    moduleId: module.id,
    templateUrl: "./main.component.html"
})
export class MainComponent implements OnInit {

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

    message = "You have successfully authenticated. This is where you build your core application functionality.";


    public hidden: boolean;
    public titleState: TITLE_STATE;
    public _bar: BottomBar;
    public inactiveColor: string;
    public accentColor: string;
    public uncoloredBackgroundColor :string;

    public items: Array<BottomBarItem> = [
        new BottomBarItem(0, "Inicio", "student", "#f7bb43"),
        new BottomBarItem(1, "Tareas", "book", "#f7bb43", new Notification("#17375e", "white", "3")),
        new BottomBarItem(2, "Mensajes", "chat", "#f7bb43", new Notification("#17375e", "white", "1")),
        new BottomBarItem(3, "Notificaciones", "notification", "#f7bb43", new Notification("#17375e", "white", "4"))
    ];

    tabLoaded(event) {

        this.page.actionBarHidden = true;
        this._bar = <BottomBar>event.object;
        
        this.hidden = false;
        /*this.titleState = TITLE_STATE.SHOW_WHEN_ACTIVE;-*/
        this.inactiveColor = "white";
        this.accentColor = "#17375e";
        this.uncoloredBackgroundColor  = "red";
    }
    
     tabSelected(args: SelectedIndexChangedEventData) {
         // only triggered when a different tab is tapped
         console.log(args.newIndex);
         console.dir(args);
         if(args.newIndex == 1 ){
            console.log("Cambiar a home")
            //this.router.navigate(["/test/1"]);
            this.router.navigate(['/main/home']);
           
        }
         if(args.newIndex == 2 ){
             console.log("Cambiar a search")
             //this.router.navigate(["/test/1"]);
             this.router.navigate(['/main/search']);
            
         }
         if(args.newIndex == 3 ){
            console.log("Cambiar a browse")
            //this.router.navigate(["/test/1"]);
            this.router.navigate(['/main/browse']);
           
        }
     }

    constructor(private router:Router, private page:Page) {
        //localStorage.setItem('logeado', false);
    }

    salir() {
        localStorage.setItem('logeado', false);
        this.router.navigate(["/login"]);
    }
}
