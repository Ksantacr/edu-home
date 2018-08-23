import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { BrowseComponent } from "./browse/browse.component";
import { HomeComponent } from "./home/home.component";
import { HomeDetalleComponent } from "./home-detalle/home-detalle.component";
import { ItemDetailComponent } from "./item-detail/item-detail.component";
import { SearchComponent } from "./search/search.component";
import { HomeworkComponent } from "./homework/homework.component";
import { LoginComponent } from './login/login.component';
import { MainComponent } from "./main/main.component";
import { MainProfesorComponent } from "./main-profesor/main.profesor.component";
import { HomeProfesorComponent } from "./home-profesor/home-profesor.component";
import { AuthGuard } from "./auth-guard.service";
import { AuthGuardProfesor } from "./auth-guard-profesor.service";
import { MensajesComponent } from "./mensajes/mensajes.component";
import { MensajesDetailComponent } from "./mensajes-detail/mensajes-detail.component";
import {CursoProfesorDetalleComponent } from "./curso-profesor-detalle/curso-profesor-detalle.component" ;
import { EnviarTrabajoComponent } from "./enviar-trabajo/enviar-trabajo.component";
import { MensajesProfesorComponent } from "./mensajes-profesor/mensajes-profesor.component";
import { BoletinComponent } from "./boletin/boletin.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { ListaComponent } from "./lista/lista.component";

export const COMPONENTS = [BrowseComponent, HomeComponent, ItemDetailComponent, SearchComponent, LoginComponent, MainComponent, HomeworkComponent, HomeDetalleComponent,MensajesComponent, MensajesDetailComponent, MainProfesorComponent, HomeProfesorComponent, CursoProfesorDetalleComponent, EnviarTrabajoComponent, MensajesProfesorComponent, BoletinComponent, PerfilComponent, ListaComponent];


export const authProviders = [
    AuthGuard,
    AuthGuardProfesor
  ];

const routes: Routes = [

    { path: "", redirectTo: "main", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "main", component: MainComponent, canActivate: [AuthGuard],
        children: [
            {path: "homework", component: HomeworkComponent},
            {path: "mensajes", component: MensajesComponent},
            {path: "home", component: HomeComponent},
            {path: "curso/:id", component: HomeDetalleComponent},
            {path: "perfil/:tipo", component: PerfilComponent},
    ]},
//    {path: "curso/:id", component: HomeDetalleComponent},
    {path: "chat/:id/:curso/:nombres/:apellidos", component: MensajesDetailComponent},
    //{path: "perfil/:tipo", component: PerfilComponent},

    { path: "profesor", component: MainProfesorComponent, canActivate: [AuthGuardProfesor],
        children: [
            {path: "home", component: HomeProfesorComponent},
            {path: "mensajes", component: MensajesProfesorComponent},
            {path: "profesorcurso/:id", component: CursoProfesorDetalleComponent},
            {path: "enviartrabajo/:id", component: EnviarTrabajoComponent},
            {path: "boletin/:id", component:BoletinComponent},
            {path: "asistencia/:id", component:ListaComponent},
            {path: "perfil/:tipo", component: PerfilComponent},
    ]},
    
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
    
})
export class AppRoutingModule { }
