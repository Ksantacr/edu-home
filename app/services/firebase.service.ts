import {Injectable, NgZone} from "@angular/core";
import {User} from "../shared/user.model";
import {Curso} from "../shared/curso.model";
import { BackendService } from "./backend.service";
import { UserEduHome } from "../shared/user-eduhome";

import firebase = require("nativescript-plugin-firebase");
import {Observable} from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { share } from 'rxjs/operators';
import { QueryOrderByType } from "nativescript-plugin-firebase";
import * as dialogs from "ui/dialogs";

export class Yowl {
  constructor
    (
      public id: string,
      public name: string,
      public username: string,
      public text: string,
      public date: string,
      public UID: string 
    )
  {}   
}

@Injectable()
export class FirebaseService {

  items: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  
  private _allItems: Array<any> = [];

  chats: BehaviorSubject<Array<Yowl>> = new BehaviorSubject([]);
private _allChats: Array<Yowl> = [];

yowls: BehaviorSubject<Array<Yowl>> = new BehaviorSubject([]);
private _allYowls: Array<Yowl> = [];

  private user:UserEduHome;
  constructor(private ngZone: NgZone, //private utils: UtilsService
    ){}

    getChats(idProfesor:string): Observable<any> {
      return new Observable((observer: any) => {
        let path = "/Chats/"+idProfesor+"/";

        console.log("Path get chats:"+path);
        
          let onValueEvent = (snapshot: any) => {
            this.ngZone.run(() => {
              let results = this.handleChatSnapshot(snapshot.value);
               observer.next(results);

               console.log(snapshot.value);

            });
          };
          firebase.addValueEventListener(onValueEvent, `/${path}`);
      })//share();
    }

    /*publishUpdates() {
      this._allYowls.sort(function(a, b){
          if(a.date < b.date) return -1;
          if(a.date > b.date) return 1;
        return 0;
      })
      this.yowls.next([...this._allYowls]);
    }*/
    publishChatUpdates() {
      this._allChats.sort(function(a, b){
          if(a.date > b.date) return -1;
          if(a.date < b.date) return 1;
        return 0;
      })
      this.chats.next([...this._allChats]);
    }


    handleChatSnapshot(data: any) {
      //empty array, then refill and filter
      this._allChats = [];
      if (data) {
        for (let id in data) {        
          let result = (<any>Object).assign({id: id}, data[id]);
            this._allChats.push(result);
        }
        this.publishChatUpdates();
      }
      return this._allChats;
    }

    chat(message:string, idProfesor:string, date:number) {
      //let chat = Chat; 
      console.log(message)  
      return firebase.push(
          "/Chats/"+idProfesor,
          { "message":message,
            "to": idProfesor,
            "from": BackendService.tokenKeyRepresentante,
            "date": 0 - date
          }
        ).then(
          function (result:any) {
            return "chatted";
          },
          function (errorMessage:any) {
            console.log(errorMessage);
          }); 
    }
    /*getMyGift(id: string): Observable<any> {
      return new Observable((observer: any) => {
        observer.next(this._allItems.filter(s => s.id === id)[0]);
      });
    }*/
    getUserData(): Promise<any> {
      return firebase.getValue('/representantes/'+BackendService.tokenKeyRepresentante);
    }
    getDatosProfesor(id:number): Promise<any> {
      return firebase.getValue('/representantes/'+BackendService.tokenKeyRepresentante+'/cursos/'+(id-1)+'/profesor');
    }
    getCurso(id:number): Promise<any> {
      return firebase.getValue('/representantes/'+BackendService.tokenKeyRepresentante+'/cursos/'+(id-1));
    }

    getCursoProfesor(id:number): Promise<any> {
      return firebase.getValue('/profesores/'+BackendService.tokenKeyProfesor+'/cursos/'+(id-1));
    }
    
    /*getCursos(): Promise<any> {
      return firebase.getValue('/representantes/'+BackendService.token+'/cursos');
    }*/
    getCursos(): Promise<any> {
      //console.log("get cursos");
      return firebase.getValue('/representantes/'+BackendService.tokenKeyRepresentante+'/cursos/');
      //return firebase.getValue('/cursos');
    }

    getCursosProfesor(): Promise<any> {
      //console.log("get cursos");
      return firebase.getValue('/profesores/'+BackendService.tokenKeyProfesor+'/cursos/');
      //return firebase.getValue('/cursos');
    }



    getLista(): Observable<any> {
      //console.log("GETCURSOS")
      return new Observable((observer: any) => {
        let path = '/representantes/'+BackendService.tokenKeyRepresentante+'/cursos';
        
          let onValueEvent = (snapshot: any) => {
            this.ngZone.run(() => {
              console.log("--->"+snapshot)
              console.log(JSON.stringify(snapshot))
              //let results = this.handleSnapshot(snapshot.value);
              //console.log(JSON.stringify(results))
               //observer.next(results);
            });
          };
          firebase.addValueEventListener(onValueEvent, `/${path}`);
      });              
    }
    getCursosListener(): any {
      let onValueEvent = function(result) {
        //console.log("Event type: " + result.type);
        //console.log("Key: " + result.key);
        //console.log("-->")
        console.log("Value: " + JSON.stringify(result.value));
      };
      firebase.addValueEventListener(onValueEvent, `/representantes/${BackendService.tokenKeyRepresentante}/`).then(
        function(listenerWrapper) {
          //let path = listenerWrapper.path;
          //let listeners = listenerWrapper.listeners; // an Array of listeners added
          // you can store the wrapper somewhere to later call 'removeEventListeners'
        }
      );
    }


    actualizarCurso(id, idTarea, tarea): Promise<any> {
      //console.log("ID: "+id)
      //console.log("idTarea: "+idTarea)
      console.dir("Tarea: "+tarea)
      return firebase.update(
        '/representantes/'+BackendService.tokenKeyRepresentante+'/cursos/'+id+'/tareasID/'+idTarea, {
          "id": tarea.id,
          "descripcion": tarea.descripcion,
          "fotoUrl": tarea.fotoUrl,
          "archivoPath": tarea.archivoPath,
          "color": tarea.color,
          "fechaEntrega":tarea.fechaEntrega,
          "revisado": tarea.revisado
        }
      );
    }
    login(user: User) {
      return firebase.login({
        type: firebase.LoginType.PASSWORD,
        email: user.email,
        password: user.password
      }).then((result: any) => {
            //BackendService.token = result.uid;
            /*BackendService.tokenKeyRepresentante = result.uid;
            //console.log(BackendService.tokenKeyRepresentante)
            //console.log("Estado: "+BackendService.isRepresentante())

            console.log(JSON.stringify(result))
            //console.log("Firebase Service :User login:-->"+JSON.stringify(result))
            return JSON.stringify(result);*/

            let data = (e) => {

              console.dir(e)
              //BackendService.tokenKeyProfesor = "VAKxe9S9wXSJ3mBVchZs24yw97p2";
              //if()
              if(e.value!=null) {
                BackendService.tokenKeyRepresentante = result.uid;
                return JSON.stringify(result)
              }else {
                dialogs.alert({
                  title: "EduHome",
                  message: "No hemos encontrado tu cuenta.",
                  okButtonText: "Aceptar"
              }).then(() => {
                  console.log("Dialog closed!");
              });
              }
            }
            return firebase.query(data, '/representantes/', {
              singleEvent:true,
              orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'id' // mandatory when type is 'child'
            },
            range: {
                  type: firebase.QueryRangeType.EQUAL_TO,
                  value: result.uid
            },
            })


        }, (errorMessage: any) => {
          console.log(errorMessage)
          //console.log("Firebase Service :User error:-->"+errorMessage)
          //alert("Por favor revisa las credenciales");
          //alert("Unfortunately we could not find your account.")
          dialogs.alert({
            title: "EduHome",
            message: "No hemos encontrado tu cuenta.",
            okButtonText: "Aceptar"
        }).then(() => {
            console.log("Dialog closed!");
        });
          
        });
    }
    loginProfesor(user: User){

      return firebase.login({
        type: firebase.LoginType.PASSWORD,
        email: user.email,
        password: user.password
      }).then((result: any) => {
            //BackendService.token = result.uid;
            //console.log(BackendService.tokenKeyRepresentante)

            //console.log("Estado: "+BackendService.isRepresentante())
            //console.log("Firebase Service :User login:-->"+JSON.stringify(result))
            //return JSON.stringify(result);
            console.log("data:");
            console.log(JSON.stringify(result))
            

            console.log(result.uid)
            //BackendService.tokenKeyProfesor = "VAKxe9S9wXSJ3mBVchZs24yw97p2";
            let data = (e) => {

              console.dir(e)
              //BackendService.tokenKeyProfesor = "VAKxe9S9wXSJ3mBVchZs24yw97p2";
              //if()
              if(e.value!=null) {
                BackendService.tokenKeyProfesor = result.uid;
                return JSON.stringify(result)
              }
      
            }
            return firebase.query(data, '/profesores/', {
              singleEvent:true,
              orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'id' // mandatory when type is 'child'
            },
            range: {
                  type: firebase.QueryRangeType.EQUAL_TO,
                  value: result.uid
            },
            })

        }, (errorMessage: any) => {
          console.log(errorMessage)
          //console.log("Firebase Service :User error:-->"+errorMessage)
          //alert("Por favor revisa las credenciales");
          //alert("Unfortunately we could not find your account.")
        });

      
    }

  datosRepresentante(): Promise<any> {
    return firebase.getValue('/representantes/'+BackendService.tokenKeyRepresentante);
      //.then(result => {console.log(JSON.stringify(result.value))})
      //.catch(error => {console.log("Error: " + error)});
  }

  datosProfesor(): Promise<any> {
    return firebase.getValue('/profesores/'+BackendService.tokenKeyProfesor);
      //.then(result => {console.log(JSON.stringify(result.value))})
      //.catch(error => {console.log("Error: " + error)});
  }

  logout(){
    console.log("Cerrar sesion");
    BackendService.tokenKeyProfesor = "";
    BackendService.tokenKeyRepresentante = "";
    firebase.logout();    
  }

  

  /*getRepresentante(): Observable<any> {

    //onsole.log("getRepresentante")
    //let path = 'representantes/'+ BackendService.token;
    //console.log(path)
    return new Observable((observer: any) => {
      let path = 'representantes/'+ BackendService.token;

        let onValueEvent = (snapshot: any) => {
          this.ngZone.run(() => {
            console.log("--->"+snapshot)
            console.log(JSON.stringify(snapshot))
            //console.log("asasdasdd");
            //let results = this.handleSnapshot(snapshot.value);
            //console.log(JSON.stringify(results))
             //observer.next(results);
          });
        };
        firebase.getValue(`${path}`).
        then(result => console.log(JSON.stringify(result)))
        .catch(error => console.log("Error: " + error));
        //firebase.addValueEventListener(onValueEvent, `/${path}/${BackendService.token}/`);
    });
  }*/

  /*getCursos(): Observable<any> {
    //console.log("GETCURSOS")
    return new Observable((observer: any) => {
      let path = 'curso/1';
      
        let onValueEvent = (snapshot: any) => {
          this.ngZone.run(() => {
            console.log("--->"+snapshot)
            console.log(JSON.stringify(snapshot))
            //let results = this.handleSnapshot(snapshot.value);
            //console.log(JSON.stringify(results))
             //observer.next(results);
          });
        };
        firebase.addValueEventListener(onValueEvent, `/${path}`);
    });              
  }*/
  
  /*register(user: User) {
    return firebase.createUser({
      email: user.email,
      password: user.password
    }).then(
          function (result:any) {
            return JSON.stringify(result);
          },
          function (errorMessage:any) {
            alert(errorMessage);
          }
      )
  } 
  
  resetPassword(email) {
    return firebase.resetPassword({
    email: email
    }).then((result: any) => {
          alert(JSON.stringify(result));
        },
        function (errorMessage:any) {
          alert(errorMessage);
        }
    ).catch(this.handleErrors);
  }

  getMyWishList(): Observable<any> {
    return new Observable((observer: any) => {
      let path = 'Gifts';
      
        let onValueEvent = (snapshot: any) => {
          this.ngZone.run(() => {
            let results = this.handleSnapshot(snapshot.value);
            console.log(JSON.stringify(results))
             observer.next(results);
          });
        };
        firebase.addValueEventListener(onValueEvent, `/${path}`);
    }).share();              
  }

  getMyGift(id: string): Observable<any> {
    return new Observable((observer: any) => {
      observer.next(this._allItems.filter(s => s.id === id)[0]);
    }).share();
  }

  getMyMessage(): Observable<any>{
    return new Observable((observer:any) => {
      firebase.getRemoteConfig({
      developerMode: false, // play with this boolean to get more frequent updates during development
      cacheExpirationSeconds: 300, // 10 minutes, default is 12 hours.. set to a lower value during dev
      properties: [{
      key: "message",
      default: "Happy Holidays!"
    }]
  }).then(
        function (result) {
          console.log("Fetched at " + result.lastFetch + (result.throttled ? " (throttled)" : ""));
          for (let entry in result.properties) 
            { 
              observer.next(result.properties[entry]);
            }
        }
    );
  }).share();
}

    

  handleSnapshot(data: any) {
    //empty array, then refill and filter
    this._allItems = [];
    if (data) {
      for (let id in data) {        
        let result = (<any>Object).assign({id: id}, data[id]);
        if(BackendService.token === result.UID){
          this._allItems.push(result);
        }        
      }
      this.publishUpdates();
    }
    return this._allItems;
  }

   publishUpdates() {
    // here, we sort must emit a *new* value (immutability!)
    this._allItems.sort(function(a, b){
        if(a.date < b.date) return -1;
        if(a.date > b.date) return 1;
      return 0;
    })
    this.items.next([...this._allItems]);
  }

  add(gift: string) {   
    return firebase.push(
        "/Gifts",
        { "name": gift, "UID": BackendService.token, "date": 0 - Date.now(), "imagepath": ""}
      ).then(
        function (result:any) {
          return 'Gift added to your wishlist!';
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        }); 
  }

  editGift(id:string, description: string, imagepath: string){
    this.publishUpdates();
    return firebase.update("/Gifts/"+id+"",{
        description: description, 
        imagepath: imagepath})
      .then(
        function (result:any) {
          return 'You have successfully edited this gift!';
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        });  
  }
  editDescription(id:string, description: string){
    this.publishUpdates();
    return firebase.update("/Gifts/"+id+"",{
        description: description})
      .then(
        function (result:any) {
          return 'You have successfully edited the description!';
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        });  
  }
  delete(gift: Gift) {
    return firebase.remove("/Gifts/"+gift.id+"")
      .catch(this.handleErrors);
  }
  
  uploadFile(localPath: string, file?: any): Promise<any> {
      let filename = this.utils.getFilename(localPath);
      let remotePath = `${filename}`;   
      return firebase.uploadFile({
        remoteFullPath: remotePath,
        localFullPath: localPath,
        onProgress: function(status) {
            console.log("Uploaded fraction: " + status.fractionCompleted);
            console.log("Percentage complete: " + status.percentageCompleted);
        }
      });
  }

  getDownloadUrl(remoteFilePath: string): Promise<any> {
      return firebase.getDownloadUrl({
        remoteFullPath: remoteFilePath})
      .then(
        function (url:string) {
          return url;
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        });
}

  handleErrors(error) {
    console.log(JSON.stringify(error));
    return Promise.reject(error.message);
  }*/

}