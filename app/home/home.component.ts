import { Component, OnInit } from "@angular/core";
import {Observable} from 'rxjs';
import { RouterExtensions } from "nativescript-angular/router";
import { CursoService  } from "../core/curso.service";

import { Curso } from "../shared/curso.model";
import { FirebaseService } from "../services/firebase.service";

import { Page } from "tns-core-modules/ui/page/page";
import { UserEduHome } from "../shared/user-eduhome";
import { User } from "../shared/user.model";

import {BehaviorSubject} from 'rxjs';


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
    public curso$: Observable<any>;
    //public gifts$: Observable<any>;
    public fotoPerfil:string;
    public testData:any;
    nombres:string;
    apellidos:string;
    //constructor(private itemService: DataService, private router: RouterExtensions) { }

    //public items$: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
    //private _items: Array<any>;


    constructor(private cursoService: CursoService, private router: RouterExtensions, private firebaseService:FirebaseService ) {
        /*this.user = new UserEduHome();
        this.firebaseService.getCursos().subscribe((data)=>{
            console.log(JSON.parse(data.value));
            //this.user = data.value;
        })*/
        this.user = new UserEduHome();
        //this.fotoPerfil = "https://steamcdn-a.akamaihd.net/steam/apps/570/header.jpg?t=1525818062";
        
    }

    ngOnInit(): void {

        //console.log("INIT");
        //console.dir("USER;"+this.user$.nombre)
        //this.page.actionBarHidden = false;
        //this.user = <any>this.firebaseService.getRepresentante();

        this.curso$ = <any>this.firebaseService.getCursos();
        //this.testData = <any>this.firebaseService.testData();

        /*if(this.user){
            console.log("USER SET")
            console.dir(this.user)
        }*/
        this.testData = <any>this.firebaseService.testData().then( data =>{
            this.user.nombre = data.value.nombres;
            this.user.apellidos = data.value.apellidos;
            this.user.fotoPerfil = data.value.fotoPerfil;
            //console.dir(data);
        }
        );
        //

        /*this.firebaseService.getCursos().subscribe((data)=>{
            //console.log(`Home Component: firebase getCursos ${data}`);
            this.user = data.value;
            console.log(this.user);
            //console.log(this.user);
        })*/

        //console.dir(this.user);
            /*this.user = <any>this.firebaseService.getRepresentante();
            console.log(this.user);*/
        this.cursos = this.cursoService.getCursos();
        
        
    }
}
