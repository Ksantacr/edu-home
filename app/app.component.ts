import { Component, OnInit } from "@angular/core";
import { isAndroid } from "platform";
import { SelectedIndexChangedEventData, TabView, TabViewItem } from "tns-core-modules/ui/tab-view";

import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
registerElement('CardView', () => CardView);

import { BackendService } from "./services/backend.service";

import firebase = require("nativescript-plugin-firebase");
import { FormsModule } from "@angular/forms";

//import { BackendService } from "./shared/backend.service";
@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
        //BackendService.setup();
        
    }

    ngOnInit(): void {

        firebase.init({
            //persist should be set to false as otherwise numbers aren't returned during livesync
            persist: true,
            storageBucket: 'gs://eduhome-abb88.appspot.com',
            onAuthStateChanged: (data: any) => {
              //console.log(JSON.stringify(data))
              if (data.loggedIn) {
                BackendService.token = data.user.uid;
              }
              else {
                BackendService.token = "";
              }
            }
          }).then(
            function (instance) {
              console.log("firebase.init done");
            },
            function (error) {
              console.log("firebase.init error: " + error);
            }
            );
        // Init your component properties here.
    }

    /*getIconSource(icon: string): string {
        const iconPrefix = isAndroid ? "res://" : "res://tabIcons/";

        return iconPrefix + icon;
    }*/
}
