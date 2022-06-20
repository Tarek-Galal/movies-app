import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Item } from 'src/app/Models/item';
import { mapMoviesToItem, Movie } from 'src/app/Models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: Item[] = [];
  genreId: string | null = null;
  searchValue: string | null = null;
  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getMoviesByGenre(genreId, 1);
      } else {
        this.getPagedMovies(1);
      }
    });
  }

  getPagedMovies(pageNum: number, searchKeyWord?: string) {
    this.moviesService
      .searchMovies(pageNum, searchKeyWord)
      .subscribe((movies) => {
        this.movies = movies.map((movie) => mapMoviesToItem(movie));
      });
  }

  paginate(event: any) {
    const pageNum = event.page + 1;
    if (this.genreId) {
      this.getMoviesByGenre(this.genreId, pageNum);
    } else {
      this.searchValue
        ? this.getPagedMovies(pageNum, this.searchValue)
        : this.getPagedMovies(pageNum);
    }
  }

  getMoviesByGenre(genreId: string, page: number) {
    this.moviesService
      .getMoviesByGenre(genreId, page)
      .subscribe((moviesData) => {
        this.movies = moviesData.map((movie) => mapMoviesToItem(movie));
      });
  }

  searchCanged() {
    if (this.searchValue) {
      this.getPagedMovies(1, this.searchValue);
    }
  }
}
