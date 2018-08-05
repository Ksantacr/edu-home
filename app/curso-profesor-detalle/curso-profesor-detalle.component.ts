import { Component, OnInit,NgZone } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { RouterExtensions } from "nativescript-angular/router";

import { Curso }  from "../shared/curso.model";

import { Tarea }  from "../shared/tarea.model";

//import { CursoService} from "../core/curso.service";
import { Observable } from "rxjs";
import { FirebaseService } from "../services/firebase.service";

@Component({

    selector: "CursoProfesorDetalle",
    moduleId: module.id,
    templateUrl: "./curso-profesor-detalle.component.html",
    styleUrls: ['./curso-profesor-detalle.component.css']


})

export class CursoProfesorDetalleComponent implements OnInit{
    curso:Curso;
    id: string;

    constructor(private route: ActivatedRoute, private router: RouterExtensions, private firebaseService:FirebaseService ) {
        this.curso = new Curso();
    }


    ngOnInit():void {
        
        const id = +this.route.snapshot.params.id;      
        console.log(id)

        this.firebaseService.getCursoProfesor(id).then(data=>{

            this.curso = new Curso(data.value.id, data.value.nombre, data.value.imagen, data.value.color);

        });
        
    }
    regresar() {
        this.router.back();
    }

}