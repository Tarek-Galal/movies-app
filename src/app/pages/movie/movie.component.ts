import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Movie,
  MovieCredits,
  MovieImages,
  MovieVideo,
} from 'src/app/Models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { IMAGES_SIZES } from 'src/app/Constants/images-sizes';
import { first } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  movie: Movie | null = null;
  movieVideos: MovieVideo[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;
  similarMovies: Movie[] = [];
  imagesSizes = IMAGES_SIZES;
  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({ id }) => {
      this.getMovie(id);
      this.getMovieVideo(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
      this.getSimilarMovies(id);
    });
  }
  getMovie(id: string) {
    this.moviesService.getMovie(id).subscribe((movieData) => {
      this.movie = movieData;
    });
  }

  getMovieVideo(id: string) {
    this.moviesService.getMovieVideos(id).subscribe((videos) => {
      this.movieVideos = videos;
    });
  }

  getMovieImages(id: string) {
    this.moviesService.getMovieImages(id).subscribe((images) => {
      this.movieImages = images;
    });
  }

  getMovieCredits(id: string) {
    this.moviesService.getMovieCredits(id).subscribe((credits) => {
      this.movieCredits = credits;
    });
  }

  getSimilarMovies(id: string) {
    this.moviesService.getSimilarMovies(id).subscribe((similarMoviesData) => {
      this.similarMovies = similarMoviesData;
    });
  }
}
