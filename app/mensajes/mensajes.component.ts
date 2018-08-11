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
    selector: 'Mensajes',
    moduleId: module.id,
    templateUrl: "./mensajes.component.html",
    styleUrls: ['./mensajes.component.css']


})

export class MensajesComponent {

    public listaNombres:Array<ChatId>;
    constructor(private router: RouterExtensions, private firebaseService:FirebaseService) {
        this.listaNombres = new Array<ChatId>();
        /*this.listaNombres.push(new Nombres("ULkcfwOT8KUx5YspqUZKncNVCF12", "Kevin Santacruz","#fc762b", "Matemáticas", "https://www.superprof.es/imagenes/anuncios/profesor-home-profesora-ciencias-con-perfil-bilingue-imparte-clases-particulares.jpg"))
        this.listaNombres.push(new Nombres("VAKxe9S9wXSJ3mBVchZs24yw97p2", "Prueba", "#5bbcb7", "Lenguaje y Literatura", "https://ekuatio.com/wp-content/uploads/metodo-ekuatio.jpg"))
        this.listaNombres.push(new Nombres("mnqlgrPCJEYuYBBsZZvQBRnxmUy1", "Demo", "#aa7100", "Ciencias Naturales", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKGRifBcv9Yh4uYo_nbooSO2uC0MdBVShWL40_Zr-SiFQ2CJei"))*/

    }
    ngOnInit () {

        <any>this.firebaseService.getChatInfoProfesores().then((data)=>{

            //console.log(data.value)
            data.value.forEach((chat)=>{

                //console.log(chat)
                //let tmp = new ChatId(chat.id, chat.idChat, chat.nombres, chat.apellidos, chat.color, chat.materia, chat.foto);

                //console.dir(tmp)
                this.listaNombres.push(new ChatId(chat.id, chat.idChat, chat.nombres, chat.apellidos, chat.color, chat.materia, chat.foto))
            })

        })
        console.dir(this.listaNombres)

        

    }

    /*public imageLoaded(args) {
        var img = args.object;
        var bc = img.bindingContext;
    
        if (bc.Loaded) {
            img.imageSource = bc.ImageSource;
        } else {
            imageSource.fromUrl(bc.ImageURL).then(function (iSource) {
                img.imageSource = iSource;
                bc.set('ImageSource', iSource);
                bc.set('Loaded', true);
            });
        }
    }*/

}