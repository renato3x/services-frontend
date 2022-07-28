import { Cargo } from "./cargo"

export interface Funcionario {
  idFuncionario?: number
  cargo: Cargo
  nome: string
  email: string
  foto: string
}
