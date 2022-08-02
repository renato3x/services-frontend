import { Funcionario } from "src/app/funcionarios/models/funcionario"
import { Cliente } from "src/app/clientes/models/cliente"
import { Pagamento } from "./pagamento"

export interface Chamado {
  idChamado?: number
  titulo: string
  descricao?: string
  dataEntrada?: Date
  status?: string
  funcionario?: Funcionario
  cliente?: Cliente
  pagamento?: Pagamento
}