import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
})
export class TrendingPageComponent implements AfterViewInit {
  scrollStateService = inject(ScrollStateService);
  gifService = inject(GifService);
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollDiv;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 300; // 300px tolerance
    this.scrollStateService.trendingScrollState.set(scrollTop);
    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
  }
}
