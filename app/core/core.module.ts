import { NgModule } from "@angular/core";
import { DataService } from "./data.service";
//import { CursoDataService } from "./curso-data.service";

@NgModule({
    providers: [
        DataService,
        //CursoDataService
    ]
})
export class CoreModule { }
