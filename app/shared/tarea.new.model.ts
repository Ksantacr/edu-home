export class NewTarea {
    /*descripcion:string;
    fotoUrl:string;
    archivoPath:string;
    color:string;
    fechaEntrega:Date;*/

    constructor(
        public id?:number,
        public titulo?:string,
        public descripcion?:string,
        public fotoUrl?:string,
        public archivoPath?:string,
        public color?:string,
        public fechaEntrega?:string,
    public revisado?:boolean){}
    //constructor(private fechaEntrega:Date) {
     //   this.fechaEntrega = new Date();
    //}

}