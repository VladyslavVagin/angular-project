import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gif-history',
  imports: [],
  templateUrl: './gif-history.component.html'
})
export class GifHistoryComponent { 
  query = inject(ActivatedRoute).params.subscribe(params => console.log(params['query']));
}
