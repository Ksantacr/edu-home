import {Component, ChangeDetectionStrategy} from "@angular/core";

var imageSource = require("image-source");

class DataItem {
    constructor(public id: number, public name: string) { }
}

class Nombres {
    constructor(public id: number, public nombre: string, public color:string, public materia:string, public foto:string) { }
}


@Component({
    selector: 'Mensajes',
    moduleId: module.id,
    templateUrl: "./mensajes.component.html",
    styleUrls: ['./mensajes.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush


})

export class MensajesComponent {


    public myItems: Array<DataItem>;
    private counter: number;

    public listaNombres:Array<Nombres>;
    private contador:number;

    constructor() {


        this.listaNombres = [];
        this.contador = 0;
        

        this.listaNombres.push(new Nombres(1, "Ingeniero Julio Alcivar","#fc762b", "Matemáticas", "https://www.superprof.es/imagenes/anuncios/profesor-home-profesora-ciencias-con-perfil-bilingue-imparte-clases-particulares.jpg"))
        this.listaNombres.push(new Nombres(2, "Ingeniera Andrea Carpio", "#5bbcb7", "Lenguaje y Literatura", "https://ekuatio.com/wp-content/uploads/metodo-ekuatio.jpg"))
        this.listaNombres.push(new Nombres(3, "Lcdo Fausto Andrade", "#aa7100", "Ciencias Naturales", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKGRifBcv9Yh4uYo_nbooSO2uC0MdBVShWL40_Zr-SiFQ2CJei"))
        this.listaNombres.push(new Nombres(1, "Lcdo Kevin Santacruz", "#8f05e8", "Emprendimiento", "https://i2.wp.com/seryhumano.com/web/wp-content/uploads/2016/01/Maestros1-e1453558688254.jpg?resize=500%2C297"))
        this.listaNombres.push(new Nombres(2, "Lcdo Joel Collahuazo", "#f9ae06", "Estudios Sociales", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYPXG7sa8qXAL2JFbagGrG-hjLLDhktwNOAJD8PQjMVgEp5xkjfg"))
        this.listaNombres.push(new Nombres(3, "Diego Carrera", "#a757e5", "Cultura Estética", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaTZrE5rVUpmKJEIZlM4vq5np9HL6zVHOgxak8kjau6vHl0A6hEQ"))


        this.myItems = [];
        this.counter = 0;
        for (var i = 0; i < 50; i++) {
            this.myItems.push(new DataItem(i, "data item " + i));
            this.counter = i;
        }
    }

    public mensajear(args) {
        console.dir(args);
    }

    public onItemTap(args) {
        console.log("------------------------ ItemTapped: " + args.index);
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