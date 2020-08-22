import {Component, Input, OnInit} from '@angular/core';
import {Professional} from '../../core/interfaces/professional';
import {Specialty} from '../../core/interfaces/specialty';
import {AgendamentoService} from '../../core/services/agendamento.service';

@Component({
  selector: 'app-professional-box',
  templateUrl: './professional-box.component.html',
  styleUrls: ['./professional-box.component.scss']
})
export class ProfessionalBoxComponent implements OnInit {

  @Input() specialty: Specialty;
  @Input() professional: Professional;

  constructor(private agendamentoService: AgendamentoService) { }

  ngOnInit(): void {
  }

  agendar(): void {
    this.agendamentoService.abrirAgendamento(this.specialty, this.professional);
  }

}
