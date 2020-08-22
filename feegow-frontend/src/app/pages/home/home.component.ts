import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {Professional} from '../../core/interfaces/professional';
import {Specialty} from '../../core/interfaces/specialty';
import {ProfessionalService} from '../../core/services/professional.service';
import {SpecialtiesService} from '../../core/services/specialties.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  especialidades: Specialty[];
  profissionais: Professional[];
  especialideSelecionada: FormControl = new FormControl(null);
  loading = false;

  private unsubscribe$ = new Subject();

  constructor(private specialtiesService: SpecialtiesService, private professionalService: ProfessionalService) {
  }

  ngOnInit(): void {
    this.specialtiesService.getAll().pipe(takeUntil(this.unsubscribe$)).subscribe(specialties => {
      this.especialidades = specialties;
    });

    this.especialideSelecionada.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(this.onChangeSpecialidade.bind(this));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onChangeSpecialidade(especialidade: Specialty): void {
    if (especialidade) {
      this.loading = true;
      this.professionalService.getBySpecialty(especialidade.especialidade_id).pipe(take(1)).subscribe(profissionais => {
        this.profissionais = profissionais;
      }).add(() => this.loading = false);
    } else {
      this.profissionais = null;
    }
  }

  scrollToEspecialidades(): void {
    $('html, body').animate({scrollTop: $('.area-corpo-clinico').position().top}, 300);
  }

}
