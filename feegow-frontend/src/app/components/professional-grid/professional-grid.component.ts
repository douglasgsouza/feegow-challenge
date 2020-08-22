import {Component, Input, OnInit} from '@angular/core';
import {Professional} from '../../core/interfaces/professional';
import {Specialty} from '../../core/interfaces/specialty';

@Component({
  selector: 'app-professional-grid',
  templateUrl: './professional-grid.component.html',
  styleUrls: ['./professional-grid.component.scss']
})
export class ProfessionalGridComponent implements OnInit {

  @Input() specialty: Specialty;
  @Input() professionals: Professional[];
  @Input() boxStyle: 'style1' | 'style2' = 'style1';

  constructor() { }

  ngOnInit(): void {
  }

}
