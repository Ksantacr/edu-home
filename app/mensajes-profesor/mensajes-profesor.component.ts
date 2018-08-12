import {Component} from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { FirebaseService } from "../services/firebase.service";
var imageSource = require("image-source");


/*class Nombres {
    constructor(public id: string, public nombre: string, public color:string, public materia:string, public foto:string) { }
}*/

class ChatId {

    constructor(public id?:string,
        public idChat?:string,
    public nombres?:string,
    public apellidos?:string,
    public color?:string,
    public materia?:string,
    public foto?:string){}
}


@Component({
    selector: 'Mensajes-profesor',
    moduleId: module.id,
    templateUrl: "./mensajes-profesor.component.html",
    styleUrls: ['./mensajes-profesor.component.css']


})

export class MensajesProfesorComponent {

    public listaNombres:Array<ChatId>;
    constructor(private router: RouterExtensions, private firebaseService:FirebaseService) {
        this.listaNombres = new Array<ChatId>();
        /*this.listaNombres.push(new Nombres("ULkcfwOT8KUx5YspqUZKncNVCF12", "Kevin Santacruz","#fc762b", "Matemáticas", "https://www.superprof.es/imagenes/anuncios/profesor-home-profesora-ciencias-con-perfil-bilingue-imparte-clases-particulares.jpg"))
        this.listaNombres.push(new Nombres("VAKxe9S9wXSJ3mBVchZs24yw97p2", "Prueba", "#5bbcb7", "Lenguaje y Literatura", "https://ekuatio.com/wp-content/uploads/metodo-ekuatio.jpg"))
        this.listaNombres.push(new Nombres("mnqlgrPCJEYuYBBsZZvQBRnxmUy1", "Demo", "#aa7100", "Ciencias Naturales", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKGRifBcv9Yh4uYo_nbooSO2uC0MdBVShWL40_Zr-SiFQ2CJei"))*/

    }
    ngOnInit () {

        /*<any>this.firebaseService.getChatInfoRepresentantes(2).then((data)=>{

            console.log(data.value)
            //console.log(data.value)
            data.value.forEach((chat)=>{
                this.listaNombres.push(new ChatId(chat.id, chat.idChat, chat.nombres, chat.apellidos, chat.color, chat.materia, chat.foto))
            })

        })*/
        

        //console.dir(this.listaNombres)

        

    }

}