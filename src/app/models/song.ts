export class Song{
    constructor(
        public number:number,
        public name:string,
        public duration:number,
        public file:string,
        public Album:string,
        public _id?:string        
    ){}
}