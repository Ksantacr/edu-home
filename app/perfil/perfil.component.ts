import { Component, OnInit,NgZone } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Curso } from "../shared/curso.model";
import { FirebaseService } from "../services/firebase.service";
import { Page } from "tns-core-modules/ui/page/page";
import { UserEduHome } from "../shared/user-eduhome";
import { BackendService } from "../services/backend.service";
import { PlatformLocation } from '@angular/common';
import { ActivatedRoute } from "@angular/router";

import * as application from "application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
import { isAndroid } from "platform";
@Component({
    selector: "Perfil",
    moduleId: module.id,
    templateUrl: "./perfil.component.html",
    styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
    cursos: Array<Curso>;
    public user:UserEduHome;
    public curso: Curso;
    public visibility:string;
    public cantidadTareas:number = 0;
    public genero:string;

    public tipo:any;

    constructor(private router: RouterExtensions, private firebaseService:FirebaseService, private route: ActivatedRoute) {
        this.user = new UserEduHome("", "", "");
        this.visibility = "visible";
        this.genero = "";
    }

    logout() {
        this.firebaseService.logout();
        this.router.navigate(["login"] , { clearHistory: true });
    }

    ngOnInit(): void {

        this.tipo = this.route.snapshot.params.tipo;
        console.log(this.tipo);
        /*if(isAndroid){
            application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                data.cancel = true;
                this.regresar();
            });
        }*/
       
        if(this.tipo == 1) {
            <any>this.firebaseService.datosRepresentante().then(
                data => {
                    this.user = new UserEduHome(data.value.nombres, data.value.apellidos, data.value.fotoPerfil)
                    //this.genero = data.value.genero;
                }
            );
        } else if(this.tipo == 2) {
            <any>this.firebaseService.datosProfesor().then(
                data => {
    
                    this.user = new UserEduHome(data.value.nombres, data.value.apellidos, data.value.fotoPerfil);
                }
            );
        }
    }

    regresar() {
        //this.router.backToPreviousPage();
        this.router.back();
    }
}
