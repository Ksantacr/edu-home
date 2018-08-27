import {Component, ViewChild, ElementRef, OnInit} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Profesor} from "../shared/profesor.model";
import { Curso} from "../shared/curso.model";
import { Observable } from 'rxjs';

import { FirebaseService } from "../services/firebase.service";
import { BackendService } from "../services/backend.service";
import * as app from "application"
import { ListView } from 'ui/list-view';
import { TextField } from 'ui/text-field';
import { ScrollView } from 'ui/scroll-view';
import {Page} from "ui/page";


import * as application from "application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
import { isAndroid } from "platform";
import { HomeComponent } from "~/home/home.component";


declare var android:any;
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

    public nombres_;
    public apellidos_;
    
    @ViewChild("list") lv: ElementRef;
    @ViewChild("textfield") tf: ElementRef;

    list: ListView;
    textfield: TextField;
    public chats$: Observable<any>;
    public id;


    constructor(private route: ActivatedRoute,private router: RouterExtensions, private firebaseService:FirebaseService, private page:Page) {
        this.curso = new Curso();

        this.page.backgroundImage = "~/images/fondo_chat.png";
        //this.profesor = new Profesor();
        /*this.page.on("loaded", (args)=>{
            var window = app.android.startActivity.getWindow();
            window.setSoftInputMode(android.view.WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
        })*/
    }

    public ngAfterViewInit() {
        this.list = this.lv.nativeElement;
        this.textfield = this.tf.nativeElement;
    }

    chat(message: string) {
        if(message!=undefined && message.length>0){
            this.firebaseService.chat(message, this.idProfesor, Date.now()).then((data: any) => {
                let count = this.list.items.length;
                //this.list.refresh();
                //this.scroll();
                this.firebaseService.notificarMensaje(this.nombres_+" "+this.apellidos_, message, this.id).subscribe(data=> {
                    console.log("Notificando Mensaje"+ message);
                });
                this.textfield.text = '';
            });
        }
        //this.scroll(0);
    }


    scroll(){

        setTimeout(()=>{
            //console.log("scrolling to ", count)
            this.list.refresh();
            console.log("Cantidad de mensajeS:"+this.list.items.length);
            this.list.scrollToIndex(this.list.items.length-1);
        }, 200);

       
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

        if(isAndroid){
            application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {

                //console.log("Back button pressed")
                data.cancel = true;
                this.regresar();
            });
        }

        this.list = this.lv.nativeElement;
        this.textfield = this.tf.nativeElement;

        this.me = BackendService.tokenKeyRepresentante;

        this.idProfesor = this.route.snapshot.params.id;
        

        let demo = this.route.snapshot.params.curso;


        let idTest = this.route.snapshot.params.idUser;
        this.id = idTest;
        console.log("ID TEST DEL USUARIO DEL CHAT:" + idTest);

        console.dir(this.route.snapshot.params)

        console.log("------------>"+demo)

        console.log("ID del chat: "+this.idProfesor);

        this.chats$ = <any>this.firebaseService.getChats(this.idProfesor);
        this.chats$.subscribe(()=>{
            console.log("Chat suscribe");
            this.scroll();
        })

        if(BackendService.isRepresentante()){
            console.log("SOY REPRESENTANTE")
            this.nombres_ = HomeComponent.user.nombre;
            this.apellidos_ = HomeComponent.user.apellidos;

            this.firebaseService.getCurso(demo).then(data=>{
                this.color = data.value.color;
                this.curso = new Curso(data.value.id, data.value.nombre, data.value.imagen, data.value.tareasID.length, data.value.color);
            })
        }else {

            let nombres = this.route.snapshot.params.nombres;
            let apellidos = this.route.snapshot.params.apellidos;
            this.nombres_ = nombres;
            this.apellidos_ = apellidos;


            console.log("Datos profesor")
            console.log(this.nombres_)
            console.log(this.apellidos_)

            console.log("SOY PROFESOR")
            this.firebaseService.getCursoProfesor(demo).then(data=>{

                console.log(data)
                this.color = data.value.color;
                this.firebaseService.getAllRepresentantes;
                this.curso.nombre = nombres+ " "+apellidos.split(' ')[0];
                //this.curso = new Curso(data.value.id, data.value.nombre, data.value.imagen, data.value.tareasID.length, data.value.color);
            })
        }
        

    }
    regresar() {
        this.router.backToPreviousPage();
        //this.router.navigate("");
        //this.router.navigate(["/main/mensajes"] , { clearHistory: true });
    }

    onFocus($event) {
        this.scroll();
        console.log("onFocus")
    }

    onTap($event) {
        this.scroll();
        console.log("Tap")
    }

    

}