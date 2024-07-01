export interface ProgramStudi {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface IndexResponse {
  program_studi: ProgramStudi[];
}

interface ShowResponse {
  program_studi: ProgramStudi;
}

interface StoreResponse {
  program_studi: ProgramStudi;
}

interface UpdateResponse {
  program_studi: ProgramStudi;
}

interface DestroyResponse {
  message: string;
}
