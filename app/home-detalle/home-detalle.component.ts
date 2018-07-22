import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import {Curso }  from "../shared/curso.model";

import { CursoService} from "../core/curso.service";
@Component({

    selector: "HomeDetalle",
    moduleId: module.id,
    templateUrl: "./home-detalle.component.html",
    styleUrls: ['./home-detalle.component.css']


})

export class HomeDetalleComponent implements OnInit{

    curso:Curso;
    public hidden:boolean;

    constructor(private route: ActivatedRoute, private cursoService:CursoService ) {}


    ngOnInit():void {
        this.hidden = true;
        const id = +this.route.snapshot.params.id;
        console.log(id)

        this.curso = this.cursoService.getCurso(id);

    }

}