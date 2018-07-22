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
//import { path } from "tns-core-modules/file-system/file-system";

import { AuthGuard } from "./auth-guard.service";

export const COMPONENTS = [BrowseComponent, HomeComponent, ItemDetailComponent, SearchComponent, LoginComponent, MainComponent, HomeworkComponent, HomeDetalleComponent];


export const authProviders = [
    AuthGuard
  ];

const routes: Routes = [

    { path: "", redirectTo: "main", pathMatch: "full" },
    //{ path: "", component: MainComponent, canActivate: [AuthGuard] },
    { path: "login", component: LoginComponent },

   /**const listRoutes: Routes = [
  { path: "", component: ListComponent, canActivate: [AuthGuard] },
]; */
    { path: "main", component: MainComponent, canActivate: [AuthGuard],
        children: [
            {path: "homework", component: HomeworkComponent},
            {path: "search", component: SearchComponent},
            {path: "browse", component: BrowseComponent},
            {path: "home", component: HomeComponent},
    ]},
    {path: "curso/:id", component: HomeDetalleComponent},
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
    
})
export class AppRoutingModule { }
