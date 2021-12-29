import { Component, OnInit } from '@angular/core';
import { ArtistsService } from '../../services/artists.service';
import { ArtistModel } from '../../models/artist.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

  artists: ArtistModel[] = [];
  loading = false;

  constructor(private artistsService: ArtistsService) { }

  ngOnInit(): void {
    //Obtain info
    this.loading = true;
    this.artistsService.getArtists().subscribe(resp => {
      this.artists = resp;
      this.loading = false;
    });
  }

  //Delete Artist
  deleteArtist(artist: any, i: number){
    Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to delete ${artist.name}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value){
        this.artists.splice(i, 1);
        this.artistsService.deleteArtist(artist.id).subscribe();
      }
    })
  }

}
