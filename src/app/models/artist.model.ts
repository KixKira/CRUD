export class ArtistModel {
    id?: string;
    name: string = "";
    band: string = "";
    active: boolean;

    constructor(){
        this.active = true;
    }
}