import { Component, OnInit } from "@angular/core";

//import * as localStorage from 'nativescript-localstorage';
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';

import { registerElement } from 'nativescript-angular';
import { BottomBar, BottomBarItem, TITLE_STATE, SelectedIndexChangedEventData, Notification } from 'nativescript-bottombar';
import { Page } from "tns-core-modules/ui/page/page";
import { FirebaseService } from "../services/firebase.service";

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
    public uncoloredBackgroundColor :string;

    public items: Array<BottomBarItem> = [
        new BottomBarItem(0, "Inicio", "student", "#f7bb43"),
        new BottomBarItem(1, "Tareas", "book", "#f7bb43", new Notification("#17375e", "white", "3")),
        new BottomBarItem(2, "Mensajes", "chat", "#f7bb43", new Notification("#17375e", "white", "1")),
        new BottomBarItem(3, "Notificaciones", "notification", "#f7bb43", new Notification("#17375e", "white", "4"))
    ];

    ngOnInit(): void {

        //this.router.navigate(['/main/home']);
        this.routerExtensions.navigate(["/main/home"], { clearHistory: true } );

    }

    constructor(private routerExtensions:RouterExtensions, private page:Page) {
        //localStorage.setItem('logeado', false);
    }
    

    tabLoaded(event) {

        //this.page.actionBarHidden = true;
        
        this._bar = <BottomBar>event.object;
        
        this.hidden = false;
        this.titleState = TITLE_STATE.SHOW_WHEN_ACTIVE;
        this.inactiveColor = "white";
        this.accentColor = "#17375e";
        this.uncoloredBackgroundColor  = "red";

    }
    
     tabSelected(args: SelectedIndexChangedEventData) {
         // only triggered when a different tab is tapped
         //console.log(args.newIndex);
         //console.dir(args);
         //this.router.navigate(['/main/home']);

        if(args.newIndex == 0 ){
            console.log("Cambiar index"+ args.newIndex);
            //this.router.navigate(["/test/1"]);
            this.routerExtensions.navigate(['/main/home'], { clearHistory: true });
        }
        if(args.newIndex == 1 ){
            console.log("Cambiar index"+ args.newIndex);
            //console.log("Cambiar a search")
            //this.router.navigate(["/test/1"]);
            this.routerExtensions.navigate(['/main/browse'], { clearHistory: true });
           
        }
        if(args.newIndex == 2 ){
            console.log("Cambiar index"+ args.newIndex);
             //console.log("Cambiar a search")
             //this.router.navigate(["/test/1"]);
             this.routerExtensions.navigate(['/main/browse'], { clearHistory: true });
            
         }
         if(args.newIndex == 3 ){
            console.log("Cambiar index"+ args.newIndex);
           //console.log("Cambiar a browse")
            //this.router.navigate(["/test/1"]);
            this.routerExtensions.navigate(['main/browse'], { clearHistory: true });
           
        }
     }
    salir() {

    }
}
