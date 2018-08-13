import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Curso }  from "../shared/curso.model";
import { FirebaseService } from "../services/firebase.service";
import { RouterExtensions } from "nativescript-angular/router";
import * as dialogs from "ui/dialogs";

@Component({
    moduleId: module.id,
    templateUrl: "./lista.component.html",
    styleUrls: ["./lista.component.css"]
})
export class ListaComponent {

    curso: Curso;
    processing = false;
    private listado:any[];
    inClass = false;

    constructor(private route: ActivatedRoute, private firebaseService:FirebaseService, private router: RouterExtensions) {
        this.listado = [];
    }

    cambiarEstado() {
        this.inClass = !this.inClass;

        this.listado.forEach((item)=>{
            item.asistencia = this.inClass;
        })
    }
    ngOnInit() {

        const id = +this.route.snapshot.params.id;
        this.firebaseService.getCursoProfesor(id).then(data=>{
            this.curso = new Curso(data.value.id, data.value.nombre, data.value.imagen, data.value.color);

        });
        this.firebaseService.getAllRepresentantes().then((data)=>{

            let cont = 0;
            data.value.forEach((representante)=>{
               this.listado.push({
                   "id": representante.id,
                   "nombres": representante.nombres,
                   "apellidos": representante.apellidos,
                   "pos": cont,
                   "asistencia": false
               })

               cont++;
            })

            console.log(this.listado);
        });
    }
    guardarLista() {

        console.log("Guardando....")
        console.log(this.listado)

        this.processing = true;
        this.firebaseService.guardarLista(this.curso.id, this.listado).then((data)=>{
            
            
            this.processing = false;
            dialogs.alert({
                title: "Guardado correctamente",
                message: "La lista se ha guardado correctamente, gracias por tu participación",
                okButtonText: "Aceptar"
            }).then(()=>{
                this.router.navigate(["/profesor/home"] , { clearHistory: true });
            })

        }, (data)=> {

            dialogs.alert({
                title: "Ha ocurrido un problema",
                message: "Lamentablemente no se ha guardado la lista, inténtalo de nuevo",
                okButtonText: "Aceptar"
            })
        })
    }
    regresar() {
        this.router.back();
    }

    generarUID () {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
    };

}