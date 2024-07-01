import { DosenOptions } from './dosen';
import { ProgramStudiOptions } from './prodi';

export interface UserMahasiswa {
  email: string;
  name: string;
  id: number;
}

export interface ManagementMahasiswaForm {
  email: string;
  name: string;
  nim: string;
  gambar: any[] | FileList | File | null | undefined;
  dosen_wali_id: DosenOptions;
  program_studi_id: ProgramStudiOptions;
  no_handphone: number;
  qr_code: string;
  tahun_masuk: string;
}
