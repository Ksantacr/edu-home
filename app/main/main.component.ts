import { Component, OnInit, ViewChild, ElementRef} from "@angular/core";

//import * as localStorage from 'nativescript-localstorage';
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';

import { registerElement } from 'nativescript-angular';
import { BottomBar, BottomBarItem, TITLE_STATE, SelectedIndexChangedEventData, Notification } from 'nativescript-bottombar';
//import { Page } from "tns-core-modules/ui/page/page";
import { Page } from "tns-core-modules/ui/page";
//import { Page } from "ui/page";

import { FirebaseService } from "../services/firebase.service";

import { Color } from "color";
import * as application from "application";
import * as platform from "platform";
import { UserEduHome } from "../shared/user-eduhome";

registerElement('BottomBar', () => BottomBar);

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

    public items: Array<BottomBarItem> = [
        new BottomBarItem(0, "Materias", "student", "#17375e"),
        new BottomBarItem(1, "Tareas", "book", "#17375e", new Notification("#17375e", "white", "3")),
        new BottomBarItem(2, "Mensajes", "chat", "#17375e", new Notification("#17375e", "white", "1"))
        //,new BottomBarItem(3, "Notificaciones", "notification", "#17375e", new Notification("#17375e", "white", "4"))
    ];
    ngOnInit(): void {
        //this.page.actionBarHidden = true;
        this.routerExtensions.navigate(["/main/home"], { clearHistory: true });        
    }

    constructor(private routerExtensions:RouterExtensions) {
    }

    
    

    tabLoaded(event) {
        this._bar = <BottomBar>event.object;        
        this.hidden = false;
        /*this.titleState = TITLE_STATE.ALWAYS_HIDE;*/
        this.inactiveColor = "#BBBBBB";
        this.accentColor = "white";

    }
    
     tabSelected(args: SelectedIndexChangedEventData) {
         // only triggered when a different tab is tapped
        if(args.newIndex == 0 ){
            //this.page.actionBarHidden = false;
            console.log("Cambiar index"+ args.newIndex);
            //this.router.navigate(["/test/1"]);
            this.routerExtensions.navigate(['/main/home'], { clearHistory: true });
        }
        if(args.newIndex == 1 ){
            //this.page.actionBarHidden = true;
            console.log("Cambiar index"+ args.newIndex);
            //console.log("Cambiar a search")
            //this.router.navigate(["/test/1"]);
            this.routerExtensions.navigate(['/main/homework'], { clearHistory: true });
           
        }
        if(args.newIndex == 2 ){
            //this.page.actionBarHidden = true;
            console.log("Cambiar index"+ args.newIndex);
             //console.log("Cambiar a search")
             //this.router.navigate(["/test/1"]);
             this.routerExtensions.navigate(['/main/browse'], { clearHistory: true });
            
         }
         /*if(args.newIndex == 3 ){
            console.log("Cambiar index"+ args.newIndex);
           //console.log("Cambiar a browse")
            //this.router.navigate(["/test/1"]);
            this.routerExtensions.navigate(['main/browse'], { clearHistory: true });
           
        }*/
     }
}
