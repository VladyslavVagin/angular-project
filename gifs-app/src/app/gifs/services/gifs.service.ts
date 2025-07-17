import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mappers/gif.mapper';

const GIF_KEY = 'gifs';

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}'; // Record<string, Gif[]>
  const gifs = JSON.parse(gifsFromLocalStorage);
  return gifs;
};

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      const group = this.trendingGifs().slice(i, i + 3);
      groups.push(group);
    }
    return groups;
  });
  trendingGifsLoading = signal<boolean>(false);
  private trendingPage = signal<number>(0);
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, historyString);
  });

  loadTrendingGifs() {
    if(this.trendingGifsLoading()) return;
    this.trendingGifsLoading.set(true);
    this.http
      .get<GiphyResponse>(`${environment.giphyURL}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
          offset: this.trendingPage() * 20, // Load more gifs on scroll
        },
      })
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        this.trendingGifs.update(currentGifs => [...currentGifs, ...gifs]);
        this.trendingPage.update(page => page + 1);
        this.trendingGifsLoading.set(false);
      });
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${environment.giphyURL}/gifs/search`, {
        params: {
          api_key: environment.giphyApiKey,
          q: query,
          limit: 20,
        },
      })
      .pipe(
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: items,
          }));
        })
      );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}
