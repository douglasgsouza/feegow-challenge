import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    // rola para o topo ao navegar
    this.router.events.pipe(takeUntil(this.unsubscribe$), filter(evt => evt instanceof NavigationEnd)).subscribe(() => {
      setTimeout(() => {
        $('html, body').animate({scrollTop: 0}, 300);
      }, 0);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
