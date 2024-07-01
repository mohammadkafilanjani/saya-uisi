export interface DashboardResponse {
  users: {
    total: number;
    active: number;
    roles: RoleCount[];
  };
  mahasiswa: {
    total: number;
    per_program_studi: ProgramStudiCount[];
    per_tahun_masuk: TahunMasukCount[];
    per_dosen_wali: DosenWaliCount[];
  };
  dosen: {
    total: number;
    mahasiswa_count: DosenMahasiswaCount[];
  };
  program_studi: {
    total: number;
    list: ProgramStudi[];
  };
}

interface RoleCount {
  role_id: number;
  total: number;
}

interface ProgramStudiCount {
  program_studi_id: number;
  total: number;
}

interface TahunMasukCount {
  year: number;
  total: number;
}

interface DosenWaliCount {
  dosen_wali_id: number;
  total: number;
}

interface DosenMahasiswaCount {
  id: number;
  name: string;
  mahasiswa_count: number;
}

interface ProgramStudi {
  id: number;
  name: string;
}

interface Role {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role_id: number;
  created_at: string;
  updated_at: string;
  role: Role;
}
