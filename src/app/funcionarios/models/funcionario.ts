import { Cargos } from "src/app/cargos/interface/cargos"

export interface Funcionario {
  idFuncionario?: number
  nome: string
  email: string
  foto: string
  cargo:Cargos
}