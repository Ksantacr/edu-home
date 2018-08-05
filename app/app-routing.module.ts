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
//import { LoginRedirectComponent } from './login-redirect/login-redirect.component';
import { MainComponent } from "./main/main.component";
import { MainProfesorComponent } from "./main-profesor/main.profesor.component";
//import { path } from "tns-core-modules/file-system/file-system";


import { HomeProfesorComponent } from "./home-profesor/home-profesor.component";
import { AuthGuard } from "./auth-guard.service";
import { AuthGuardProfesor } from "./auth-guard-profesor.service";

import { MensajesComponent } from "./mensajes/mensajes.component";
import { MensajesDetailComponent } from "./mensajes-detail/mensajes-detail.component";
import {CursoProfesorDetalleComponent } from "./curso-profesor-detalle/curso-profesor-detalle.component" ;
import { EnviarTrabajoComponent } from "./enviar-trabajo/enviar-trabajo.component";

export const COMPONENTS = [BrowseComponent, HomeComponent, ItemDetailComponent, SearchComponent, LoginComponent, MainComponent, HomeworkComponent, HomeDetalleComponent,MensajesComponent, MensajesDetailComponent, MainProfesorComponent, HomeProfesorComponent, CursoProfesorDetalleComponent, EnviarTrabajoComponent];


export const authProviders = [
    AuthGuard,
    AuthGuardProfesor
  ];

const routes: Routes = [

    { path: "", redirectTo: "main", pathMatch: "full" },
    //{ path: "", component: MainComponent, canActivate: [AuthGuard] },

    //{ path: "loginRedirect", component: LoginRedirectComponent },
    { path: "login", component: LoginComponent },

   /**const listRoutes: Routes = [
  { path: "", component: ListComponent, canActivate: [AuthGuard] },
]; */
/*{ path: "mainprofesor", component: MainProfesorComponent, canActivate: [AuthGuard],
        children: [
    ]},*/
    { path: "main", component: MainComponent, canActivate: [AuthGuard],
        children: [
            {path: "homework", component: HomeworkComponent},
            //{path: "search", component: SearchComponent},
            {path: "mensajes", component: MensajesComponent},
            {path: "home", component: HomeComponent},
    ]},
    {path: "curso/:id", component: HomeDetalleComponent},
    {path: "chat/:id", component: MensajesDetailComponent},

    { path: "profesor", component: MainProfesorComponent, canActivate: [AuthGuardProfesor],
        children: [
            {path: "home", component: HomeProfesorComponent}
    ]},
    {path: "profesorcurso/:id", component: CursoProfesorDetalleComponent},
    {path: "enviartrabajo/:id", component: EnviarTrabajoComponent},
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
    
})
export class AppRoutingModule { }
