import { Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';

import { registerElement } from 'nativescript-angular';
//import { BottomBar, BottomBarItem, TITLE_STATE, SelectedIndexChangedEventData, Notification } from 'nativescript-bottombar';
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
    
    public icoMaterias = "~/images/libro_g.png";
    public icoPerfil = "~/images/estudiante_b.png";


    static icoMaterias = "~/images/libro_g.png";   
    static icoPerfil = "~/images/estudiante_b.png";

    static icoPerfilTint = "white";
    static icoMateriasTint = "#BBBBBB";

    get icoMaterias_() {
        return MainProfesorComponent.icoMaterias;
    }   
    get icoPerfil_() {
        return MainProfesorComponent.icoPerfil;
    }
    get icoPerfilTint_() {
        return MainProfesorComponent.icoPerfilTint;
    }    
    get icoMateriasTint_() {
        return MainProfesorComponent.icoMateriasTint;
    }

    ngOnInit(): void {
        console.log("Main profesor");
        //this.icoMateriasTint = "white";
        this.irHome();
        //this.routerExtensions.navigate(["/profesor/home"], { clearHistory: true });
    }

    constructor(private routerExtensions:RouterExtensions, private firebaseService:FirebaseService) {

        /*let mensajes_notificaciones = new Notification("#17375e", "white", "4");
        this.items = [new BottomBarItem(0, "Materias", "book", "#17375e", null),
        new BottomBarItem(1, "Perfil", "student", "#17375e"),
        //new BottomBarItem(2, "Mensajes", "chat", "#17375e")
        //,new BottomBarItem(3, "Notificaciones", "notification", "#17375e", new Notification("#17375e", "white", "4"))
    ]*/
    }
    irHome() {
        MainProfesorComponent.icoMateriasTint = "white";
        MainProfesorComponent.icoPerfilTint = "#BBBBBB";

        MainProfesorComponent.icoMaterias = "~/images/libro_b.png";
        MainProfesorComponent.icoPerfil = "~/images/estudiante_g.png";

        this.routerExtensions.navigate(['/profesor/home'], { clearHistory: true });
    }

    irPerfil() {
        MainProfesorComponent.icoMateriasTint = "#BBBBBB";
        MainProfesorComponent.icoPerfilTint = "white";

        MainProfesorComponent.icoMaterias = "~/images/libro_g.png";
        MainProfesorComponent.icoPerfil = "~/images/estudiante_b.png";

        
        this.routerExtensions.navigate(['/profesor/perfil/2'], { clearHistory: true });
    }
/*
    img1 () {
        this.icoMateriasTint = "white";
    }
    img2 () {
        this.icoPerfilTint = "#BBBBBB";
    }*/
/*
    tabLoaded(event) {
        this._bar = <BottomBar>event.object;        
        this.hidden = false;
        this.titleState = TITLE_STATE.ALWAYS_SHOW;
        this.inactiveColor = "#BBBBBB";
        this.accentColor = "white";
    }

    checkItem(event) {

        console.log("Evento")
        console.dir(event)
    }
    
     tabSelected(args: SelectedIndexChangedEventData) {
         // only triggered when a different tab is tapped
        if(args.newIndex == 0 ){
            this.routerExtensions.navigate(['/profesor/home'], { clearHistory: true });
        }
        if(args.newIndex == 1 ){
            this.routerExtensions.navigate(['/profesor/perfil/2'], { clearHistory: true });
        }
     }

     logout() {
        this.firebaseService.logout();
        this.routerExtensions.navigate(["login"] , { clearHistory: true });
    }
    */
}
