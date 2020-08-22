import {ProfessionalSpecialty} from './professional-specialty';

export interface Professional {
  professional_id: number;
  nome: string;
  tratamento: number;
  rqe: number;
  conselho: number;
  documento_conselho: string;
  uf_conselho: string;
  foto: string;
  sexo: string;
  especialidades: ProfessionalSpecialty[];
}
