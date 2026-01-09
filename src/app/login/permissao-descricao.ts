import { Permissao } from './permissao';

export const PermissaoDescricoes: Record<Permissao, string> = {
  [Permissao.ADMIN]: 'ADMIN',
  [Permissao.ALUNO]: 'ALUNO',
  [Permissao.MENTOR]: 'MENTOR',
  [Permissao.EMPRESA]: 'EMPRESA',
  [Permissao.SUPORTE]: 'SUPORTE',
};
