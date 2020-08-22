import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AgendamentoService} from '../../core/services/agendamento.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {

  constructor(private agendamentoService: AgendamentoService) { }

  ngOnInit(): void {
  }

  openModal(): void {
    this.agendamentoService.abrirAgendamento();
  }

}
