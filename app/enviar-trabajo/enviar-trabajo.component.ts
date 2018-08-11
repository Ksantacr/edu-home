import { Component } from "@angular/core";
import { DatePicker } from "ui/date-picker";
import { EventData } from "data/observable";
import { ActivatedRoute } from "@angular/router";
import { Curso }  from "../shared/curso.model";
import { Observable } from "rxjs";
import { FirebaseService } from "../services/firebase.service";
import {  UtilsService } from "../utils/util.service";

import { RouterExtensions } from "nativescript-angular/router";

import { ModalDatetimepicker, PickerOptions } from 'nativescript-modal-datetimepicker';

import * as dialogs from "ui/dialogs";
//import { reloadUser } from "nativescript-plugin-firebase";

import * as enums from 'ui/enums';
import * as imageSource from 'image-source';

import * as camera from "nativescript-camera";
import * as fs from "file-system";
import { NewTarea } from "../shared/tarea.new.model";

//var imageModule = require("ui/image");
var img;

@Component({
    moduleId: module.id,
    templateUrl: "./enviar-trabajo.component.html",
    styleUrls: ["./enviar-trabajo.component.css"]
})
export class EnviarTrabajoComponent {

    curso: Curso;
    public fecha:Date;
    public titulo:string;
    public descripcion:string;
    private imagePath: string;
    image: any;
    processing = false;


  private uploadedImageName: string;
  private uploadedImagePath: string;

  private listadoRepresentantes:string[];
  private cantidadTareasCurso:number[];

    private modalDatetimepicker: ModalDatetimepicker;
    

    constructor(private route: ActivatedRoute, private firebaseService:FirebaseService, private router: RouterExtensions,  private utilsService: UtilsService) {
        this.modalDatetimepicker = new ModalDatetimepicker();
        this.listadoRepresentantes = [];
        this.cantidadTareasCurso = [];
    }

    ngOnInit() {

        const id = +this.route.snapshot.params.id;

        this.firebaseService.getCursoProfesor(id).then(data=>{

            this.curso = new Curso(data.value.id, data.value.nombre, data.value.imagen, data.value.color);

        });

       this.firebaseService.getAllRepresentantes().then((data)=>{
           //console.dir(data)
           data.value.forEach((representante)=>{
               //console.log(representante)
               this.listadoRepresentantes.push(representante.id)
               
           })
       });

       this.firebaseService.getCantidadTareasCurso().then(data=>{

        //console.log(data)

        data.value.forEach(element => {
            this.cantidadTareasCurso.push(element.cantidad);
        });
        console.log("-------->>>");
        console.log(this.cantidadTareasCurso)

        //this.cantidadTareasCurso.psuh()
            /*this.cantidadTareasCurso.push(data.cantidad);

            console.log(this.cantidadTareasCurso);*/
            
       })
        /*.then((data)=>{
            console.dir(data.value)

            console.log("-->")

            data.value.forEach(element => {
                console.log(element)
            });
        })*/
    }

    selectDate() {
        this.modalDatetimepicker.pickDate(<PickerOptions>{
            title: "Fecha de entrega",
            //theme: "dark",
            startingDate: new Date(),
            //maxDate: new Date(),
            minDate: new Date()
        }).then((result:any) => {
            if (result) {
                this.fecha = new Date(result.year, result.month-1, result.day);
            } else {
                console.log(false)
            }
        })
        .catch((error) => {
            console.log("Error: " + error);
        });
    };

    takePhoto() {
        camera.requestPermissions().then(()=>{
            //this.processing = true;
            let options = {
                    width: 300,
                    height: 300,
                    keepAspectRatio: true,
                    saveToGallery: false
                };
            camera.takePicture(options)
                .then(imageAsset => {
                    imageSource.fromAsset(imageAsset).then(res => {
                        this.image = res;
                        //save the source image to a file, then send that file path to firebase
                        this.saveToFile(this.image);
                        //this.processing = false;
                    })
                }).catch(function (err) {
                    console.log("Error -> " + err.message);
                });
        });
    }

    enviarTarea() {

        dialogs.confirm({
            title: "Nueva tarea",
            message: "Confirmación de envio de tarea",
            okButtonText: "Aceptar",
            cancelButtonText: "Cancelar"
        }).then(result => {

        if(result) {
            console.log(`La imagen esta en el path ${this.image} es hora de subirlo al server todo`)

            console.log(this.image)
            
            if(this.image){
                this.firebaseService.uploadFile(this.imagePath).then((uploadedFile: any) => {
                    this.uploadedImageName = uploadedFile.name;
                    //get downloadURL and store it as a full path;
                    this.firebaseService.getDownloadUrl(this.uploadedImageName).then((downloadUrl: string) => {
                        let temp_tarea = new NewTarea(this.cantidadTareasCurso[this.curso.id-1], this.titulo, this.descripcion, downloadUrl, "", this.curso.color, ""+this.fecha.getTime(), false);
                        console.log("TRUE")
                        console.log(temp_tarea)
                        //this.firebaseService.agregarTarea(this.curso.id, temp_tarea)
                    /*this.firebaseService.editGift(id,this.description,downloadUrl).then((result:any) => {
                        alert(result)
                    }, (error: any) => {
                        alert(error);
                    });*/
                    this.listadoRepresentantes.forEach((r)=>{
                        this.firebaseService.agregarTareaRepresentante(r, ""+(this.curso.id-1), temp_tarea);
                    })
                    this.cantidadTareasCurso[this.curso.id-1]+=1;

                    this.firebaseService.actualizarCantidadTareasCurso(this.curso.id-1, this.cantidadTareasCurso[this.curso.id-1]).then(data=>{
                        dialogs.alert({
                            title: "Tarea enviada",
                            message: "La tarea se ha enviado correctamente",
                            okButtonText: "Aceptar"
                        }).then(()=>{
                            this.router.navigate(["/profesor/home"] , { clearHistory: true });
                        })
                    });
                    })
                }, (error: any) => {
                    dialogs.alert({
                        title: "Problema al enviar tarea",
                        message: "La tarea no se ha enviado. Porfavor intentalo de nuevo"
                    })
                });
            }else {
                this.processing = true;
                let temp_tarea = new NewTarea(this.cantidadTareasCurso[this.curso.id-1], this.titulo, this.descripcion,"", "", this.curso.color, ""+this.fecha.getTime(), false);
                console.log("TRUE")
                console.log(temp_tarea)
                this.listadoRepresentantes.forEach((r)=>{
                    console.log(r)
                    this.firebaseService.agregarTareaRepresentante(r, ""+(this.curso.id-1), temp_tarea).then((data)=>{
                        //console.log("TAREA AGREGADA")
                        console.dir(data)
                    });
                })

                this.cantidadTareasCurso[this.curso.id-1]+=1;

                    this.firebaseService.actualizarCantidadTareasCurso(this.curso.id-1, this.cantidadTareasCurso[this.curso.id-1]).then(()=>{
                        dialogs.alert({
                            title: "Tarea enviada",
                            message: "La tarea se ha enviado correctamente",
                            okButtonText: "Aceptar"
                        }).then(()=>{
                            this.router.navigate(["/profesor/home"] , { clearHistory: true });
                        })

                    });

                

            }
        }
            //console.log("Dialog result: " + result);
    });
}

    saveToFile(res){
        let imgsrc = res;
              this.imagePath = this.utilsService.documentsPath(`tarea-${Date.now()}.png`);
              imgsrc.saveToFile(this.imagePath, enums.ImageFormat.png); 
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