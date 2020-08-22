import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {AgendamentoService} from '../../core/services/agendamento.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  isSticky = false;

  constructor(private agendamentoService: AgendamentoService) { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const pos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isSticky = pos > 100;
  }

  openModal(): void {
    this.agendamentoService.abrirAgendamento();
  }

}
