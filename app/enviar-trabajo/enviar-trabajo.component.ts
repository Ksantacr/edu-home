import { Component } from "@angular/core";
import { DatePicker } from "ui/date-picker";
import { EventData } from "data/observable";
import { ActivatedRoute } from "@angular/router";
import { Curso }  from "../shared/curso.model";
import { Observable } from "rxjs";
import { FirebaseService } from "../services/firebase.service";
import { RouterExtensions } from "nativescript-angular/router";

import { ModalDatetimepicker, PickerOptions } from 'nativescript-modal-datetimepicker';

@Component({
    moduleId: module.id,
    templateUrl: "./enviar-trabajo.component.html",
    styleUrls: ["./enviar-trabajo.component.css"]
})
export class EnviarTrabajoComponent {

    curso: Curso;
    public date: string;
    public time: string;
    private modalDatetimepicker: ModalDatetimepicker;
    

    constructor(private route: ActivatedRoute, private firebaseService:FirebaseService, private router: RouterExtensions) {
        this.modalDatetimepicker = new ModalDatetimepicker();
    }

    ngOnInit() {
        const id = +this.route.snapshot.params.id;

        this.firebaseService.getCursoProfesor(id).then(data=>{

            this.curso = new Curso(data.value.id, data.value.nombre, data.value.imagen, data.value.color);

        });

    }

    selectDate() {
        this.modalDatetimepicker.pickDate(<PickerOptions>{
            title: "Configurable Title",
            theme: "dark",
            startingDate: new Date(),
            //maxDate: new Date(),
            minDate: new Date()
        }).then((result:any) => {
            if (result) {

                console.log("Date is: " + result.day + "-" + result.month + "-" + result.year)
                this.date = "Date is: " + result.day + "-" + result.month + "-" + result.year;
            } else {
                console.log(false)
                //this.set("date", false);
            }
        })
        .catch((error) => {
            console.log("Error: " + error);
        });
    };

    regresar() {
        this.router.back();
    }

}