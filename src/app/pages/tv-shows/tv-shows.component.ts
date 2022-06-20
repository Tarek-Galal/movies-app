import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/Models/item';
import { mapTvShowsToItem, TvShow } from 'src/app/Models/tvShow';
import { TvshowsService } from 'src/app/services/tvshows.service';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss'],
})
export class TvShowsComponent implements OnInit {
  tvShows: Item[] = [];
  genreId: string | null = null;
  searchValue: string | null = null;

  constructor(private tvShowsService: TvshowsService) {}

  ngOnInit(): void {
    this.getPagedTvShows(1);
  }

  getPagedTvShows(page: number, searchKeyword?: string) {
    this.tvShowsService
      .searchTvShow(page, searchKeyword)
      .subscribe((tvShows) => {
        this.tvShows = tvShows.map((movie) => mapTvShowsToItem(movie));
      });
  }

  paginate(event: any) {
    const pageNumber = event.page + 1;

    if (this.searchValue) {
      this.getPagedTvShows(pageNumber, this.searchValue);
    } else {
      this.getPagedTvShows(pageNumber);
    }
  }
}
