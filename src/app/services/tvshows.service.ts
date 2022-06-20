import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';
import {
  TvShow,
  TvShowCredits,
  TvShowDTO,
  TvShowImages,
  TvShowVideoDto,
} from '../Models/tvShow';

@Injectable({
  providedIn: 'root',
})
export class TvshowsService {
  baseUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = 'd52062aca04599269b54c7bbc3dd3176';

  constructor(private http: HttpClient) {}

  getTvShows(type: string = 'popular', count: number = 12) {
    return this.http
      .get<TvShowDTO>(`${this.baseUrl}/tv/${type}?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, count));
        })
      );
  }

  getTvShow(id: string) {
    return this.http.get<TvShow>(
      `${this.baseUrl}/tv/${id}?api_key=${this.apiKey}`
    );
  }

  searchTvShow(page: number, searchValue?: string) {
    const uri = searchValue ? '/search/tv' : '/tv/popular';
    return this.http
      .get<TvShowDTO>(
        `${this.baseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getTvShowImages(id: string) {
    return this.http.get<TvShowImages>(
      `${this.baseUrl}/tv/${id}/images?api_key=${this.apiKey}`
    );
  }

  getTvShowCredits(id: string) {
    return this.http.get<TvShowCredits>(
      `${this.baseUrl}/tv/${id}/credits?api_key=${this.apiKey}`
    );
  }

  getTvShowSimilar(id: string) {
    return this.http
      .get<TvShowDTO>(`${this.baseUrl}/tv/${id}/similar?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, 6));
        })
      );
  }

  getTvShowVideos(id: string) {
    return this.http
      .get<TvShowVideoDto>(
        `${this.baseUrl}/tv/${id}/videos?api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }
}
