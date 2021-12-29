import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsComponent } from './pages/artists/artists.component';
import { ArtistComponent } from './pages/artist/artist.component';

const routes: Routes = [
  { path: 'artists', component: ArtistsComponent },
  { path: 'artist/:id', component: ArtistComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'artists' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
