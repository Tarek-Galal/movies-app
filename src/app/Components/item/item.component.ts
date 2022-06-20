import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/Models/item';
import { Movie } from 'src/app/Models/movie';
import { TvShow } from 'src/app/Models/tvShow';
import { IMAGES_SIZES } from '../../Constants/images-sizes';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() itemData: Item | null = null;

  readonly imagesSizes = IMAGES_SIZES;
  constructor() {}

  ngOnInit(): void {}
}
