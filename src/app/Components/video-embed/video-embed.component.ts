import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-embed',
  templateUrl: './video-embed.component.html',
  styleUrls: ['./video-embed.component.scss'],
})
export class VideoEmbedComponent implements OnInit {
  @Input() site: string = 'YouTube';
  @Input() key: string | null = null;

  // videoUrl: SafeResourceUrl = '';
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // this.videoUrl = this.getSafeUrl(
    //   'https://www.youtube-nocookie.com/embed/' + this.key
    // );
  }

  // getSafeUrl(url: string) {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  // }
}
