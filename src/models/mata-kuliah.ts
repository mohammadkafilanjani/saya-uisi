import { ProgramStudi } from './programStudi';

export interface MataKuliah {
  id: number;
  nama_mata_kuliah: string;
  kode: string;
  sks: number;
  program_studi_id: number;
  program_studi: ProgramStudi;
}

export interface MataKuliahOptions {
  nama_mata_kuliah: string;
  id: number;
  label: string;
  value: number;
}
