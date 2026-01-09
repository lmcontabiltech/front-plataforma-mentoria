import { Permissao } from './permissao';

export class Usuario {
  id!: string;
  foto?: { documentoUrl: string; id: number; name: string } | null;
  fotoUrl?: any;
  username!: string;
  password!: string;
  confirmPassword!: string;
  email!: string;
  nome!: string;
  tipoUsuario!: string;
  permissao!: Permissao;
  darkMode!: boolean;
}
