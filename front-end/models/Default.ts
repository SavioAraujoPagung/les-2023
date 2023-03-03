export default abstract class Default{
    path:string;
    id:number | null;

    constructor(path:string){
        this.path = path;
        this.id = null;
    }
}