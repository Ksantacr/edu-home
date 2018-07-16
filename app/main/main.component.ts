import { Component, OnInit } from "@angular/core";

import * as localStorage from 'nativescript-localstorage';
import { Router } from "@angular/router";

import { registerElement } from 'nativescript-angular';
import { BottomBar, BottomBarItem, TITLE_STATE, SelectedIndexChangedEventData, Notification } from 'nativescript-bottombar';

registerElement('BottomBar', () => BottomBar);


@Component({
    selector: "app-main",
    moduleId: module.id,
    templateUrl: "./main.component.html"
})
export class MainComponent implements OnInit {
    message = "You have successfully authenticated. This is where you build your core application functionality.";


    public hidden: boolean;
    public titleState: TITLE_STATE;
    public _bar: BottomBar;
    public inactiveColor: string;
    public accentColor: string;

    public items: Array<BottomBarItem> = [
        new BottomBarItem(0, "Home", "home", "black", new Notification("blue", "white", "1")),
        new BottomBarItem(1, "Calendar", "search", "#1083BF", new Notification("green", "blue", "1")),
        new BottomBarItem(2, "Profile", "browse", "pink", new Notification("pink", "yellow", "1")),
        new BottomBarItem(3, "Message", "home", "green", new Notification("green", "red", "1"))
    ];

    tabLoaded(event) {
        this._bar = <BottomBar>event.object;
        this.hidden = false;
        this.titleState = TITLE_STATE.SHOW_WHEN_ACTIVE;
        this.inactiveColor = "white";
        this.accentColor = "blue";
    }
    
     tabSelected(args: SelectedIndexChangedEventData) {
         // only triggered when a different tab is tapped
         console.log(args.newIndex);
         console.dir(args);
         if(args.newIndex == 2 ){
             console.log("Cambiar a search")
             //this.router.navigate(["/test/1"]);
             this.router.navigate(['/main/search']);
            
         }
     }

    constructor(private router:Router) {
        //localStorage.setItem('logeado', false);
    }

    ngOnInit(): void {
    }
    salir() {
        localStorage.setItem('logeado', false);
        this.router.navigate(["/login"]);
    }
}
