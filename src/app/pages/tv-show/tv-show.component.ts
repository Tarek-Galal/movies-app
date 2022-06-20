import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { IMAGES_SIZES } from 'src/app/Constants/images-sizes';
import { Item } from 'src/app/Models/item';
import {
  mapTvShowsToItem,
  TvShow,
  TvShowCredits,
  TvShowImages,
  TvShowVideo,
} from 'src/app/Models/tvShow';
import { TvshowsService } from 'src/app/services/tvshows.service';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.scss'],
})
export class TvShowComponent implements OnInit {
  tvShow: TvShow | null = null;
  tvShowBanner: Item | null = null;
  tvShowVideos: TvShowVideo[] = [];
  tvShowImages: TvShowImages | null = null;
  tvShowCredits: TvShowCredits | null = null;
  similarTvShows: Item[] = [];

  imagesSizes = IMAGES_SIZES;

  constructor(
    private tvShowsService: TvshowsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({ id }) => {
      this.getTvShow(id);
      this.getTvShowVideos(id);
      this.getTvShowImages(id);
      this.getTvShowCredits(id);
      this.getSimilarTvShows(id);
    });
  }

  getTvShow(id: string) {
    this.tvShowsService.getTvShow(id).subscribe((tvShow) => {
      this.tvShowBanner = mapTvShowsToItem(tvShow);
      this.tvShow = tvShow;
    });
  }

  getTvShowVideos(id: string) {
    this.tvShowsService.getTvShowVideos(id).subscribe((tvShowVideosData) => {
      this.tvShowVideos = tvShowVideosData;
    });
  }

  getTvShowImages(id: string) {
    this.tvShowsService.getTvShowImages(id).subscribe((tvShowImagesData) => {
      this.tvShowImages = tvShowImagesData;
    });
  }

  getTvShowCredits(id: string) {
    this.tvShowsService.getTvShowCredits(id).subscribe((tvShowCreditsData) => {
      this.tvShowCredits = tvShowCreditsData;
    });
  }

  getSimilarTvShows(id: string) {
    this.tvShowsService.getTvShowSimilar(id).subscribe((similarTvShowData) => {
      this.similarTvShows = similarTvShowData.map((tvShow) =>
        mapTvShowsToItem(tvShow)
      );
      console.log(this.similarTvShows);
    });
  }
}
