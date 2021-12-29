import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArtistModel } from '../../models/artist.model';
import { ArtistsService } from '../../services/artists.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  //Import ArtistModel
  artist = new ArtistModel();

  constructor(private artistsService: ArtistsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    if (id !== 'new'){
      this.artistsService.getArtist(id!).subscribe((resp: any) => {
        this.artist = resp;
        this.artist.id = id;
      });
    }
  }

  //Method Form
  save(form: NgForm){
    if (form.invalid) {
      console.log('Form invalid');
      return;
    }
    Swal.fire('Wait please', 'Saving data...', 'info');
    Swal.showLoading();
    let petition: Observable<any>;
    if (this.artist.id){
      petition = this.artistsService.updateArtist(this.artist);
    }else{
      petition = this.artistsService.createArtist(this.artist);
    }
    petition.subscribe( resp => {
      Swal.fire(this.artist.name, 'Updated successfully', 'success');
    });
  }

}
