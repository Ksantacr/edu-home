import {Component, ViewChild, ElementRef, OnInit} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Profesor} from "../shared/profesor.model";
import { Curso} from "../shared/curso.model";
import { Observable } from 'rxjs';

import { FirebaseService } from "../services/firebase.service";
import { BackendService } from "../services/backend.service";

import { ListView } from 'ui/list-view';
import { TextField } from 'ui/text-field';
import { ScrollView } from 'ui/scroll-view';

@Component({
    selector: 'MensajesDetalle',
    moduleId: module.id,
    templateUrl: "./mensajes-detail.component.html",
    styleUrls: ['./mensajes-detail.component.css']
})

export class MensajesDetailComponent implements OnInit {

    curso: Curso;
    profesor:Profesor;
    color:string;
    message:string;

    public idProfesor:string;

    public me: String;
    
    @ViewChild("list") lv: ElementRef;
    @ViewChild("textfield") tf: ElementRef;

    list: ListView;
    textfield: TextField;
    public chats$: Observable<any>;


    constructor(private route: ActivatedRoute,private router: RouterExtensions, private firebaseService:FirebaseService ) {
        this.curso = new Curso();
        //this.profesor = new Profesor();
    }

    public ngAfterViewInit() {
        this.list = this.lv.nativeElement;
        this.textfield = this.tf.nativeElement;

        
    }

    chat(message: string) {
        if(message.length>0){
            this.firebaseService.chat(message, this.idProfesor).then((data: any) => {
                let count = this.list.items.length;
                this.list.refresh();
                this.scroll(count+5);
                this.textfield.text = '';
            });
        }
        
    }


    scroll(count:number){
        console.log("scrolling to ", count)
        //this.list.refresh();
        this.list.scrollToIndex(count-1);
     }

     filter(sender) {
        if (sender == BackendService.tokenKeyRepresentante) {
            return "me"
        }
        else {
            return "them"
        }
    }

    align(sender) {
        if (sender == BackendService.tokenKeyRepresentante) {
            return "right"
        }
        else {
            return "left"
        }
    }
    showImage(sender) {
        if (sender == BackendService.tokenKeyRepresentante) {
            return "collapsed"
        }
        else {
            return "visible"
        }
    }

    ngOnInit():void {

        this.list = this.lv.nativeElement;
        this.textfield = this.tf.nativeElement;

        this.me = BackendService.tokenKeyRepresentante;

        this.idProfesor = this.route.snapshot.params.id;
        console.log("ID del chat: "+this.idProfesor);

        this.chats$ = <any>this.firebaseService.getChats(this.idProfesor);
        
        this.firebaseService.getCurso(1).then(data=>{

            //console.log(data.value.color);
            this.color = data.value.color;

            this.curso = new Curso(data.value.id, data.value.nombre, data.value.imagen, data.value.tareasID.length, data.value.color);
            //console.log(this.curso);
        })
        

    }
    regresar() {
        this.router.back();
    }

    listo() {
        console.log("listo");
    }


}