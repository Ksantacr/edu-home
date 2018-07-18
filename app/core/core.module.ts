import { NgModule } from "@angular/core";
import { DataService } from "./data.service";
import { CursoService } from "./curso.service";

@NgModule({
    providers: [
        //DataService,
        CursoService
    ]
})
export class CoreModule { }
