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

var imageModule = require("ui/image");
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
    private imagePath: string;
    image: any;
    processing = false;


  private uploadedImageName: string;
  private uploadedImagePath: string;

    private modalDatetimepicker: ModalDatetimepicker;
    

    constructor(private route: ActivatedRoute, private firebaseService:FirebaseService, private router: RouterExtensions,  private utilsService: UtilsService) {
        this.modalDatetimepicker = new ModalDatetimepicker();
    }

    ngOnInit() {
        camera.requestPermissions();

        const id = +this.route.snapshot.params.id;

        this.firebaseService.getCursoProfesor(id).then(data=>{

            this.curso = new Curso(data.value.id, data.value.nombre, data.value.imagen, data.value.color);

        });

    }

    selectDate() {
        this.modalDatetimepicker.pickDate(<PickerOptions>{
            title: "Configurable Title",
            //theme: "dark",
            startingDate: new Date(),
            //maxDate: new Date(),
            minDate: new Date()
        }).then((result:any) => {
            if (result) {
                this.fecha = new Date(result.year, result.month, result.day);
            } else {
                console.log(false)
            }
        })
        .catch((error) => {
            console.log("Error: " + error);
        });
    };

    takePhoto() {

        this.processing = true;
        let options = {
                  width: 300,
                  height: 300,
                  keepAspectRatio: true,
                  saveToGallery: true
              };
          camera.takePicture(options)
              .then(imageAsset => {
                  imageSource.fromAsset(imageAsset).then(res => {
                      this.image = res;
                      //save the source image to a file, then send that file path to firebase
                      this.saveToFile(this.image);
                      this.processing = false;
                  })
              }).catch(function (err) {
                  console.log("Error -> " + err.message);
              });
    }

    enviarTarea() {

        dialogs.confirm({
            title: "Nueva tarea",
            message: "Confirmación de envio de tarea",
            okButtonText: "Aceptar",
            cancelButtonText: "Cancelar"
            //neutralButtonText: "Neutral text"
        }).then(result => {

        if(result) {
            console.log(`La imagen esta en el path ${this.image} es hora de subirlo al server todo`)

            this.processing = true;
            this.firebaseService.uploadFile(this.imagePath).then((uploadedFile: any) => {
                this.uploadedImageName = uploadedFile.name;
                //get downloadURL and store it as a full path;
                this.firebaseService.getDownloadUrl(this.uploadedImageName).then((downloadUrl: string) => {

                    this.processing = false;
                    console.log(`Agregar la nueva tarea en los registros`);

                    let temp_tarea = new NewTarea(this.titulo, downloadUrl, "", this.curso.color, ""+this.fecha.getTime());
                    this.firebaseService.agregarTarea(temp_tarea)
                /*this.firebaseService.editGift(id,this.description,downloadUrl).then((result:any) => {
                    alert(result)
                }, (error: any) => {
                    alert(error);
                });*/

                    dialogs.alert({
                        title: "Tarea enviada",
                        message: "La tarea se ha enviado correctamente"
                    })

                    this.router.navigate(["/profesor/home"] , { clearHistory: true });

                    
                })
            }, (error: any) => {
                dialogs.alert({
                    title: "Problema al enviar tarea",
                    message: "La tarea no se ha enviado. Porfavor intentalo de nuevo"
                })
            });
        }
            //console.log("Dialog result: " + result);
    });
}

    saveToFile(res){
        let imgsrc = res;
              this.imagePath = this.utilsService.documentsPath(`photo-${Date.now()}.png`);
              imgsrc.saveToFile(this.imagePath, enums.ImageFormat.png); 
    }

    regresar() {
        this.router.back();
    }

}