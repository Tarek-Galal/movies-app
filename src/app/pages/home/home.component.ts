import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/Models/item';
import { mapMoviesToItem, Movie } from 'src/app/Models/movie';
import { mapTvShowsToItem, TvShow } from 'src/app/Models/tvShow';
import { MoviesService } from 'src/app/services/movies.service';
import { TvshowsService } from 'src/app/services/tvshows.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  popularMovies: Item[] = [];
  upcomingMovies: Item[] = [];
  topRatedMovies: Item[] = [];
  popularTvShows: Item[] = [];
  constructor(
    private movieService: MoviesService,
    private tvShowService: TvshowsService
  ) {}

  ngOnInit(): void {
    this.movieService.getMovies('popular').subscribe((response) => {
      this.popularMovies = response.map((movie) => mapMoviesToItem(movie));
    });

    this.movieService.getMovies('upcoming').subscribe((response) => {
      this.upcomingMovies = response.map((movie) => mapMoviesToItem(movie));
    });

    this.movieService.getMovies('top_rated').subscribe((response) => {
      this.topRatedMovies = response.map((movie) => mapMoviesToItem(movie));
    });

    this.tvShowService.getTvShows('popular').subscribe((response) => {
      this.popularTvShows = response.map((movie) => mapTvShowsToItem(movie));
    });
  }
}
