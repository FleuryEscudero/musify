import { Artist } from './artist.models';


export class Album {

    constructor (
        public title:string,
        public description: string,
        public year:number,
        public image: string,
        public artist:Artist  // se pone la clase modelo con la que relaciona para poder acceder a sus atributos     
    ){
String
    }
}