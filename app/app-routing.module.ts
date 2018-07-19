import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { BrowseComponent } from "./browse/browse.component";
import { HomeComponent } from "./home/home.component";
import { ItemDetailComponent } from "./item-detail/item-detail.component";
import { SearchComponent } from "./search/search.component";

import { LoginComponent } from './login/login.component';
import { MainComponent } from "./main/main.component";
//import { path } from "tns-core-modules/file-system/file-system";

import { AuthGuard } from "./auth-guard.service";

export const COMPONENTS = [BrowseComponent, HomeComponent, ItemDetailComponent, SearchComponent, LoginComponent, MainComponent];


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
            {path: "search", component: SearchComponent},
            {path: "browse", component: BrowseComponent},
            {path: "home", component: HomeComponent},
    ]},
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
    
})
export class AppRoutingModule { }
