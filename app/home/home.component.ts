import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { CursoService  } from "../core/curso.service";

import { Curso } from "../shared/curso.model";
import { FirebaseService } from "../services/firebase.service";

import { Page } from "tns-core-modules/ui/page/page";
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

    //constructor(private itemService: DataService, private router: RouterExtensions) { }
    constructor(private cursoService: CursoService, private router: RouterExtensions) { }

    ngOnInit(): void {
        //this.page.actionBarHidden = false;
        /*this.firebaseService.getCursos().subscribe((data)=>{
            //console.log(`Home Component: firebase getCursos ${data}`);
        })*/
        this.cursos = this.cursoService.getCursos();
    }
}
