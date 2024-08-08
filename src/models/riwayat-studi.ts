export interface Main {
  query_result: QueryResult;
}

export interface QueryResult {
  data: Data;
  retrieved_at: Date;
}

export interface Data {
  columns: Column[];
  rows: Row[];
}

export interface Column {
  name: string;
  friendly_name: string;
  type: string;
}

export interface Row {
  mku_kode: string;
  mkl_nama: string;
  mku_sks: number;
  nilaihuruf: string;
  bobot: string;
  semester: Semester;
  is_transkrip: IsTranskrip;
}

export enum IsTranskrip {
  Ya = 'Ya',
}

export enum Semester {
  The20232024Ganjil = '2023/2024 Ganjil',
  The20232024Genap = '2023/2024 Genap',
}
