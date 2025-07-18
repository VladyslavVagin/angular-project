import { Component, inject, signal } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';
import { GifMapper } from '../../mappers/gif.mapper';

@Component({
  selector: 'app-search-page',
  imports: [GifsListComponent],
  templateUrl: './search-page.component.html',
})
export class SearchPageComponent {

  gifService = inject(GifService);
  gifs = signal<Gif[]>([]);

  onSearch(query: string): void {
    this.gifService.searchGifs(query).subscribe(resp => {
       this.gifs.set(resp);
    });
  }
 }
