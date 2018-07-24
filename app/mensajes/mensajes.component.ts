import {Component, ChangeDetectionStrategy} from "@angular/core";


class DataItem {
    constructor(public id: number, public name: string) { }
}

class Nombres {
    constructor(public id: number, public name: string, public color:string) { }
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

        this.listaNombres.push(new Nombres(0, "Ingeniero Julio Alcivar","#fc762b" ))
        this.listaNombres.push(new Nombres(1, "Ingeniera Andrea Carpio", "#5bbcb7"))
        this.listaNombres.push(new Nombres(2, "Lcdo Fausto Andrade", "#aa7100"))

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

}