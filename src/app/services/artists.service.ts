import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArtistModel } from '../models/artist.model';
import { map, delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  //URL
  private url = 'https://login-92000-default-rtdb.firebaseio.com'

  constructor(private http: HttpClient) { }

  //Create Artist
  createArtist(artist: ArtistModel) {
    return this.http.post(`${this.url}/artists.json`, artist).pipe(
      map( (resp: any) => {
        artist.id = resp.name;
        return artist;
      })
    );
  }

  //Update Artist
  updateArtist(artist: ArtistModel) {
    const artistTemp = {
      ...artist
    };
    delete artistTemp.id;
    return this.http.put(`${this.url}/artists/${artist.id}.json`, artistTemp);
  }

  //Delete Artist
  deleteArtist(id: string){
    return this.http.delete(`${this.url}/artists/${id}.json`);
  }

  //Get list of Artists
  getArtists(){
    return this.http.get(`${this.url}/artists.json`).pipe(
      map(this.createArrangement),
      delay(2000)
    );
  }

  private createArrangement(artistsObj: any){
    const artists: ArtistModel[] = [];
    if (artistsObj === null){
      return [];
    }
    Object.keys(artistsObj).forEach(key => {
      const artist: ArtistModel = artistsObj[key];
      artist.id = key;
      artists.push(artist);
    });
    return artists;
  }

  //Obtain Artists by ID
  getArtist(id: string) {
    return this.http.get(`${this.url}/artists/${id}.json`);
  }
}
