import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { BrowseComponent } from "./browse/browse.component";
import { HomeComponent } from "./home/home.component";
import { ItemDetailComponent } from "./item-detail/item-detail.component";
import { SearchComponent } from "./search/search.component";

import { LoginComponent } from './login/login.component';
import { MainComponent } from "./main/main.component";
import { path } from "tns-core-modules/file-system/file-system";

export const COMPONENTS = [BrowseComponent, HomeComponent, ItemDetailComponent, SearchComponent, LoginComponent, MainComponent];

const routes: Routes = [

    /*{ path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },*/

    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },

    //{ path: "test", component: TestComponent},
    /*
     { path: "", component: ParentComponent,
        children: [
            { path: "", component: ChildComponent },
            { path: "other", component: OtherChildComponent },
        ]
    }
    */
    { path: "main", component: MainComponent, 
children: [
    {path: "search", component: SearchComponent, outlet: "homeTab"},
    {path: "browse", component: BrowseComponent},
    {path: "home", component: HomeComponent},
]},
    //{ path: "test/:id", component: SearchComponent},
    //{ path: "go", redirectTo: "/(homeTab:home//browseTab:browse//searchTab:search)", pathMatch: "full" },

    /*{ path: "home", component: HomeComponent, outlet: "homeTab" },
    { path: "browse", component: BrowseComponent, outlet: "browseTab" },
    { path: "search", component: SearchComponent, outlet: "searchTab" },
    { path: "item/:id", component: ItemDetailComponent, outlet: "homeTab" }*/
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
    
})
export class AppRoutingModule { }
