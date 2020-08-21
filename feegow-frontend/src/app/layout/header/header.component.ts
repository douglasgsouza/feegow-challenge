import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  isSticky = false;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const pos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isSticky = pos > 100;
  }

}
