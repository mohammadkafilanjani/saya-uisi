export interface Kelas {
  id: number;
  nama_kelas: string;
  mata_kuliah_id: number;
  dosen_id: number;
  semester: number;
  tahun_ajaran: string;
  waktu_mulai?: string;
  waktu_selesai?: string;
  hari?: string;
}

export interface KelasWithProdiNameAndDosenName {
  id: number;
  nama_kelas: string;
  mata_kuliah_id: number;
  nama_dosen: string;
  nama_program_studi: string;
  dosen_id: number;
  semester: number;
  tahun_ajaran: string;
}

export interface EditedKelas {
  id: number;
  nama_kelas: string;
  nama_dosen: string;
  nama_program_studi: string;
  semester: string;
  tahun_ajaran: string;
}
