import {Component, Input, OnInit} from '@angular/core';
import {Professional} from '../../core/interfaces/professional';

@Component({
  selector: 'app-professional-box',
  templateUrl: './professional-box.component.html',
  styleUrls: ['./professional-box.component.scss']
})
export class ProfessionalBoxComponent implements OnInit {

  @Input() professional: Professional;

  constructor() { }

  ngOnInit(): void {
    if (!this.professional.foto) {
      switch (this.professional.sexo) {
        case 'Masculino':
          this.professional.foto = 'assets/images/placeholder_masculino.jpg';
          break;
        case 'Feminino':
          this.professional.foto = 'assets/images/placeholder_feminino.jpg';
          break;
        default:
          this.professional.foto = 'assets/images/placeholder_profissional.jpg';
      }
    }
  }

}
