import { Component, OnInit,NgZone } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { RouterExtensions } from "nativescript-angular/router";

import {Curso }  from "../shared/curso.model";

import { CursoService} from "../core/curso.service";
import { Observable } from "rxjs";
import { FirebaseService } from "../services/firebase.service";
@Component({

    selector: "HomeDetalle",
    moduleId: module.id,
    templateUrl: "./home-detalle.component.html",
    styleUrls: ['./home-detalle.component.css']


})

export class HomeDetalleComponent implements OnInit{

    private sub: any;
    curso:Curso;


    id: string;
    name: string;
    description: string;
    imagepath: string;
    image: any;

    public gift:Observable<any>;
    //public hidden:boolean;

    constructor(private route: ActivatedRoute, private router: RouterExtensions, private firebaseService:FirebaseService ) {
        this.curso = new Curso();
    }


    ngOnInit():void {
        
        //this.hidden = true;
        const id = +this.route.snapshot.params.id;        
        //this.curso = this.cursoService.getCurso(id);

        this.firebaseService.getCurso(id).then(data=>{

            this.curso = new Curso(data.value.id, data.value.nombre, data.value.imagen, data.value.tareasID.length, data.value.color);

        });
        //console.log(""+JSON.stringify(this.curso))
        
    }
    regresar() {
        //console.log("Back tap");
        //this.router.backToPreviousPage();
        this.router.back();
    }

    listo() {
        console.log("listo");
    }

}