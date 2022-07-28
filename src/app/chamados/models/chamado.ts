import { Funcionario } from "src/app/funcionarios/models/funcionario"

export interface Chamado {
  idChamado?: number
  titulo: string
  descricao?: string
  dataEntrada?: Date
  status?: string
  funcionario?: Funcionario
  cliente?: string
  pagamento?: string
}