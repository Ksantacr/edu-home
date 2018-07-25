import {Component} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Profesor} from "../shared/profesor.model";
import { Curso} from "../shared/curso.model";
import { FirebaseService } from "../services/firebase.service";

@Component({
    selector: 'MensajesDetalle',
    moduleId: module.id,
    templateUrl: "./mensajes-detail.component.html",
    styleUrls: ['./mensajes-detail.component.css']
})

export class MensajesDetailComponent {

    curso: Curso;
    profesor:Profesor;
    color:string;


    constructor(private route: ActivatedRoute,private router: RouterExtensions, private firebaseService:FirebaseService ) {
        this.curso = new Curso();
        //this.profesor = new Profesor();
    }



    ngOnInit():void {

        const id = +this.route.snapshot.params.id;
        console.log("ID del chat"+id);

        this.firebaseService.getCurso(id).then(data=>{

            console.log(data.value.color);
            this.color = data.value.color;


            this.curso = new Curso(data.value.id, data.value.nombre, data.value.imagen, data.value.tareasID.length, data.value.color);


            console.log(this.curso);
            /*this.profesor = new Profesor(data.value.profesor.nombres,
                data.value.profesor.apellidos,
                data.value.profesor.titulo);*/

        })

        /*this.firebaseService.getDatosProfesor(id).then(data=>{
            console.log(data);
        })*/

       


    }
    regresar() {
        this.router.back();
    }

    listo() {
        console.log("listo");
    }


}