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
//import { path } from "tns-core-modules/file-system/file-system";

import { AuthGuard } from "./auth-guard.service";
import { AuthGuardProfesor } from "./auth-guard-profesor.service";

import { MensajesComponent } from "./mensajes/mensajes.component";
import { MensajesDetailComponent } from "./mensajes-detail/mensajes-detail.component";

export const COMPONENTS = [BrowseComponent, HomeComponent, ItemDetailComponent, SearchComponent, LoginComponent, MainComponent, HomeworkComponent, HomeDetalleComponent,MensajesComponent, MensajesDetailComponent, MainProfesorComponent];


export const authProviders = [
    AuthGuard,
    AuthGuardProfesor
  ];

const routes: Routes = [

    { path: "", redirectTo: "main", pathMatch: "full" },
    //{ path: "", component: MainComponent, canActivate: [AuthGuard] },
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
    
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
    
})
export class AppRoutingModule { }
