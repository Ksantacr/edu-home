import { Component, OnInit } from "@angular/core";
import { isAndroid } from "platform";
import { SelectedIndexChangedEventData, TabView, TabViewItem } from "tns-core-modules/ui/tab-view";

//import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
import { registerElement } from 'nativescript-angular';
import { BottomBar, BottomBarItem, TITLE_STATE,Notification } from 'nativescript-bottombar';

registerElement('CardView', () => CardView);
registerElement('BottomBar', () => BottomBar);

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

          /*firebase.keepInSync(
            '/representantes/'+BackendService.token+'/cursos/', // which path in your Firebase needs to be kept in sync?
            true      // set to false to disable this feature again
          ).then(
            function () {
              console.log("firebase.keepInSync is ON for /users");
            },
            function (error) {
              console.log("firebase.keepInSync error: " + error);
            }
          );*/
        // Init your component properties here.
    }

    /*getIconSource(icon: string): string {
        const iconPrefix = isAndroid ? "res://" : "res://tabIcons/";

        return iconPrefix + icon;
    }*/
}
