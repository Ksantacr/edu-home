import { Component } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { UserEduHome } from "../shared/user-eduhome";
import { FirebaseService } from "../services/firebase.service";
import { Curso } from "../shared/curso.model";
import { RouterExtensions } from "nativescript-angular/router";
import { MainProfesorComponent } from "../main-profesor/main.profesor.component";

@Component({
    selector: "app-home-profesor",
    moduleId: module.id,
    templateUrl: "./home-profesor.component.html",
    styleUrls: ["./home-profesor.component.css"]
})

export class HomeProfesorComponent {

    public user:UserEduHome;
    static nombres:string;
    static apellidos:string;
    cursos: Array<Curso>;

    irPerfil () {

        MainProfesorComponent.icoMateriasTint = "#BBBBBB";
        MainProfesorComponent.icoPerfilTint = "white";

        MainProfesorComponent.icoMaterias = "~/images/libro_g.png";
        MainProfesorComponent.icoPerfil = "~/images/estudiante_b.png";
        
        this.router.navigate(['/profesor/perfil/2'], { clearHistory: true });
    }

    constructor(private firebaseService:FirebaseService, private router: RouterExtensions) {

        this.user = new UserEduHome("", "", "");

        console.log("Home Profesor");

        <any>this.firebaseService.datosProfesor().then(
            data => {

                //console.dir(data);

                this.user = new UserEduHome(data.value.nombres, data.value.apellidos, data.value.fotoPerfil)
                HomeProfesorComponent.nombres = data.value.nombres;
                HomeProfesorComponent.apellidos = data.value.apellidos;
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