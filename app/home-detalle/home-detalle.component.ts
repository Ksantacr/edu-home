import { Component, OnInit,NgZone } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { RouterExtensions } from "nativescript-angular/router";

import { Curso }  from "../shared/curso.model";

import { Tarea }  from "../shared/tarea.model";

//import { CursoService} from "../core/curso.service";
import { Observable } from "rxjs";
import { FirebaseService } from "../services/firebase.service";

import * as dialogs from "ui/dialogs";

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

    public listaTareas:Array<Tarea>;
    listaTareas_:Array<Tarea>;

    public gift:Observable<any>;
    //public hidden:boolean;

    constructor(private route: ActivatedRoute, private router: RouterExtensions, private firebaseService:FirebaseService ) {
        this.curso = new Curso();
        this.listaTareas = [];
        this.listaTareas_= [];
    }


    ngOnInit():void {
        
        //this.hidden = true;
        const id = +this.route.snapshot.params.id;        
        //this.curso = this.cursoService.getCurso(id);

        this.firebaseService.getCurso(id).then(data=>{

            this.curso = new Curso(data.value.id, data.value.nombre, data.value.imagen, data.value.color);

            data.value.tareasID.forEach((tarea) => {
                console.log(new Date(tarea.fechaEntrega))
                
                if(!tarea.revisado && (new Date(tarea.fechaEntrega)>=new Date())) {
                    this.listaTareas.push(new Tarea(tarea.id,tarea.titulo, tarea.descripcion, tarea.fotoUrl, tarea.archivoPath, tarea.color, tarea.fechaEntrega, tarea.revisado));
                }
            });

            console.dir(this.listaTareas)
            this.curso.cantidadTareas = this.listaTareas.length;

            //console.dir(this.listaTareas);

        });
        //console.log(""+JSON.stringify(this.curso))
        
    }
    actualizarTareas() {
        //this.listaTareas_ = this.listaTareas;
        /*this.listaTareas.forEach(tarea=>{
            if(!tarea.revisado){
                this.listaTareas_.push(new Tarea(tarea.id,tarea.titulo, tarea.descripcion, tarea.fotoUrl, tarea.archivoPath, tarea.color, tarea.fechaEntrega, tarea.revisado));
            }
        })*/
        this.listaTareas = this.listaTareas.filter(tarea=>{
            return (!tarea.revisado && new Date(tarea.fechaEntrega)>=new Date())
        })

        //this.listaTareas = this.listaTareas_;
    }
    regresar() {
        //console.log("Back tap");
        this.router.back();
        //this.router.navigate(['/main/home'], { clearHistory: true });
        //this.router.back();
    }

    listo(tarea) {

        dialogs.confirm({
            title: "Tarea",
            message: "Marcar la tarea como revisada!",
            okButtonText: "Aceptar",
            cancelButtonText: "Cancelar"
            //neutralButtonText: "Neutral text"
        }).then(result => {
            // result argument is boolean

            if(result) {
                this.listaTareas[this.listaTareas.indexOf(tarea)].revisado = true;


                console.log("Indice de la tarea"+this.listaTareas[this.listaTareas.indexOf(tarea)])

                console.dir(this.listaTareas[0])
                
                this.firebaseService.actualizarCurso(this.curso.id - 1, this.listaTareas.indexOf(tarea), this.listaTareas[this.listaTareas.indexOf(tarea)]).then(

                    ()=>{this.actualizarTareas()}
                    //data => {
                    //    console.log(data)
                    //}

                    //this.firebaseService.getCursos()
                );
                //this.listaTareas.splice(this.listaTareas.indexOf(tarea), 1);
            }
            //console.log("Dialog result: " + result);
        });
        //console.dir(e);
        //this.listaTareas.splice(e, 1);
    }

}