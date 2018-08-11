export class Tarea {
    /*descripcion:string;
    fotoUrl:string;
    archivoPath:string;
    color:string;
    fechaEntrega:Date;*/

    constructor(public id:string,
        public titulo?:string,
        public descripcion?:string,
        public fotoUrl?:string,
        public archivoPath?:string,
        public color?:string,
        public fechaEntrega?:number,
        public revisado?:boolean){}
    //constructor(private fechaEntrega:Date) {
     //   this.fechaEntrega = new Date();
    //}

}