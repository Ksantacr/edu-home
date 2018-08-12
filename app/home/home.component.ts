import { Component, OnInit,NgZone } from "@angular/core";
import {Observable} from 'rxjs';
import { RouterExtensions } from "nativescript-angular/router";
//import { CursoService  } from "../core/curso.service";

import { Curso } from "../shared/curso.model";
import { FirebaseService } from "../services/firebase.service";

import { Page } from "tns-core-modules/ui/page/page";
import { UserEduHome } from "../shared/user-eduhome";
import { User } from "../shared/user.model";

//import {BehaviorSubject} from 'rxjs';
import { BackendService } from "../services/backend.service";
//import { forEach } from "@angular/router/src/utils/collection";
//import { NgAnalyzedFileWithInjectables } from "@angular/compiler";

import { PlatformLocation } from '@angular/common';

/*import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
registerElement('CardView', () => CardView);*/

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    //items: Array<IDataItem>;
    cursos: Array<Curso>;
    public user:UserEduHome;
    public curso: Curso;
    //public curso$: Observable<any>;
    //public gifts$: Observable<any>;
    public fotoPerfil:string;
    //public testData:any;
    //nombres:string;
    //apellidos:string;
    //private sub:any;
    //public lista: Observable<any>;

    public gifts$: Observable<any>;

    public visibility:string;
    public cantidadTareas:number = 0;

    public genero:string;
    //constructor(private itemService: DataService, private router: RouterExtensions) { }

    //public items$: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
    //private _items: Array<any>;


    constructor(private router: RouterExtensions, private firebaseService:FirebaseService, private location : PlatformLocation) {
        this.user = new UserEduHome("", "", "");
        this.visibility = "visible";
        this.genero = "";
    }
    logout() {
        this.firebaseService.logout();
        this.router.navigate(["login"] , { clearHistory: true });
    }

    ocultarMensaje($event) {
        this.visibility = "hidden";
    }

    ngOnInit(): void {

        this.location.onPopState(() => {
            this.getData();
            console.log("ESTOY EN HOME COMPONENT!!!!!!!!!!!!!!!!!!")
        });

        this.getData();
       
        <any>this.firebaseService.datosRepresentante().then(
            data => {
                this.user = new UserEduHome(data.value.nombres, data.value.apellidos, data.value.fotoPerfil)

                this.genero = data.value.genero;

                console.log(this.genero)
            }
        );
    }

    getData() {
        <any>this.firebaseService.getCursos().then(
            (data)=>{
                this.cursos = [];
                data.value.forEach((curso)=>{

                   let tareas = [];

                   curso.tareasID.forEach((tarea)=>{
                    if(!tarea.revisado && (new Date(tarea.fechaEntrega)>=new Date())){
                       console.dir(tarea)
                       tareas.push(0)
                    }
                   })
                    this.cursos.push(new Curso(curso.id, curso.nombre, curso.imagen, curso.color, tareas.length));
                })
            }
        );
    }
}
