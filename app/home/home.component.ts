import { Component, OnInit,NgZone } from "@angular/core";
import {Observable} from 'rxjs';
import { RouterExtensions } from "nativescript-angular/router";
import { CursoService  } from "../core/curso.service";

import { Curso } from "../shared/curso.model";
import { FirebaseService } from "../services/firebase.service";

import { Page } from "tns-core-modules/ui/page/page";
import { UserEduHome } from "../shared/user-eduhome";
import { User } from "../shared/user.model";

import {BehaviorSubject} from 'rxjs';
import { BackendService } from "../services/backend.service";
import { forEach } from "@angular/router/src/utils/collection";


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

    public gifts$: Observable<any>;

    //constructor(private itemService: DataService, private router: RouterExtensions) { }

    //public items$: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
    //private _items: Array<any>;


    constructor(private cursoService: CursoService, private router: RouterExtensions, private firebaseService:FirebaseService ) {
        this.user = new UserEduHome("", "", "");
    }

    ngOnInit(): void {

        //console.log("INIT");
        //console.dir("USER;"+this.user$.nombre)
        //this.page.actionBarHidden = false;
        //this.user = <any>this.firebaseService.getRepresentante();


        //this.sub = <any>this.firebaseService.listenProfileData();

        //console.dir(this.gifts$);

        <any>this.firebaseService.getCursos().then(
            (data)=>{
                this.cursos = [];
                data.value.forEach((data)=>{

                    this.cursos.push(new Curso(data.id, data.nombre, data.imagen, data.tareasID.length, data.color));
                })
            }
        );
        <any>this.firebaseService.testData().then( data =>{

            this.user = new UserEduHome(data.value.nombres, data.value.apellidos, data.value.fotoPerfil)
           
        }
        );

        /*this.firebaseService.getUserData().then((gift) => {
              this.ngZone.run(() => {
                console.log("Get user data")
                console.log(gift.value)
              });
        }); */

        //this.cursos = this.cursoService.getCursos();
        
        
    }
}
