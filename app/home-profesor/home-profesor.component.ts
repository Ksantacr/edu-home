import { Component } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { UserEduHome } from "../shared/user-eduhome";
import { FirebaseService } from "../services/firebase.service";
import { Curso } from "../shared/curso.model";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "app-home-profesor",
    moduleId: module.id,
    templateUrl: "./home-profesor.component.html",
    styleUrls: ["./home-profesor.component.css"]
})

export class HomeProfesorComponent {

    public user:UserEduHome;
    cursos: Array<Curso>;

    

    constructor(private firebaseService:FirebaseService, private router: RouterExtensions) {

        this.user = new UserEduHome("", "", "");

        console.log("Home Profesor");

        <any>this.firebaseService.datosProfesor().then(
            data => {

                //console.dir(data);

                this.user = new UserEduHome(data.value.nombres, data.value.apellidos, data.value.fotoPerfil)
            }
        );

        <any>this.firebaseService.getCursosProfesor().then(

            
            (data)=>{

                console.dir(data)
                this.cursos = [];
                data.value.forEach((curso)=>{

                   //let tareas:Array<Curso> = curso.tareasID.filter( tarea => tarea.revisado==false);

                    this.cursos.push(new Curso(curso.id, curso.nombre, curso.imagen, curso.color, 0, curso.curso));
                })
            }
            
        );

    }

    logout() {
        this.firebaseService.logout();
        this.router.navigate(["login"] , { clearHistory: true });
    }

    


}