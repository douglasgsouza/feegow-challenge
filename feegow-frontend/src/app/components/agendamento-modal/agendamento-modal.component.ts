import {HttpErrorResponse} from '@angular/common/http';
import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {Agendamento} from '../../core/interfaces/agendamento';
import {AgendamentoPair} from '../../core/interfaces/agendamento-pair';
import {PatientSource} from '../../core/interfaces/patient-source';
import {Professional} from '../../core/interfaces/professional';
import {Specialty} from '../../core/interfaces/specialty';
import {AgendamentoService} from '../../core/services/agendamento.service';
import {PatientService} from '../../core/services/patient.service';
import {ProfessionalService} from '../../core/services/professional.service';
import {SpecialtiesService} from '../../core/services/specialties.service';

@Component({
  selector: 'app-agendamento-modal',
  templateUrl: './agendamento-modal.component.html',
  styleUrls: ['./agendamento-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgendamentoModalComponent implements OnInit, OnDestroy {

  especialidades: Specialty[];
  profissionais: Professional[];
  origens: PatientSource[];

  especialideSelecionada: FormControl;
  profissionalSelecionado: Professional;
  agendamentoCriado: Agendamento;


  agendamentoForm: FormGroup;
  loading      = false;
  formSubmited = false;
  sending      = false;

  private unsubscribe$ = new Subject();

  constructor(private agendamentoService: AgendamentoService, private specialtiesService: SpecialtiesService,
              private professionalService: ProfessionalService, private patientService: PatientService,
              private formBuilder: FormBuilder, private ref: ChangeDetectorRef) {

    this.especialideSelecionada = new FormControl(null);

    this.agendamentoForm = this.formBuilder.group({
      specialty_id: [null, Validators.required],
      professional_id: [null, Validators.required],
      source_id: [null, Validators.required],
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      birthdate: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.specialtiesService.getAll().pipe(takeUntil(this.unsubscribe$)).subscribe(specialties => {
      this.especialidades = specialties;
    });

    this.agendamentoService.abrirAgendamento$.pipe(takeUntil(this.unsubscribe$)).subscribe(this.onAbrirAgendamento.bind(this));

    this.especialideSelecionada.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(this.onChangeSpecialidade.bind(this));
    $('app-agendamento-modal .modal').on('hidden.bs.modal', this.onHiddenModal.bind(this));

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onAbrirAgendamento(pair: AgendamentoPair): void {
    $('app-agendamento-modal .modal').modal('show');

    if (pair.specialty && pair.professional) {

      this.especialideSelecionada.setValue(pair.specialty);
      this.profissionalSelecionado = pair.professional;
      this.agendamentoForm.patchValue({
          specialty_id: pair.specialty.especialidade_id,
          professional_id: pair.professional.profissional_id
        }
      );

      if (!this.origens) {
        this.loading = true;
        this.patientService.getPatientSources().pipe(take(1)).subscribe(sources => this.origens = sources)
          .add(() => this.loading = false);
      }
    }
  }

  onHiddenModal(): void {
    this.especialideSelecionada.setValue(null);
    this.profissionalSelecionado = null;
    this.agendamentoCriado       = null;
    this.agendamentoForm.reset();

    this.formSubmited = false;
    this.loading      = false;
    this.formSubmited = false;
    this.sending      = false;

    this.ref.detectChanges();
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

  getValidationClasses(field: string): object {
    if (this.formSubmited) {
      return {
        'is-invalid': this.agendamentoForm.get(field).invalid,
        'is-valid': this.agendamentoForm.get(field).valid
      };
    } else {
      return null;
    }
  }

  agendar(): void {
    this.formSubmited = true;

    if (this.agendamentoForm.valid) {
      const agendamento = this.agendamentoForm.getRawValue();

      this.sending = true;
      this.agendamentoForm.disable();

      // envia a requisição para gravar o agendamento
      this.agendamentoService.salvarAgendamento(agendamento).subscribe(response => {
        this.agendamentoCriado = response;
        this.sending = false;
      }, httpError => {
        this.agendamentoForm.enable();
        this.sending = false;

        // verifica se houve erro de validação server side
        if (httpError instanceof HttpErrorResponse && httpError.status === 422) {
            const field = httpError.error.error.field;
            if (this.agendamentoForm.get(field)) {
              this.agendamentoForm.get(field).setErrors({server: true});
              this.agendamentoForm.get(field).markAsTouched();
            }
        }
      });

    }
  }

}
