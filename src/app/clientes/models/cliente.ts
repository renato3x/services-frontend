import { Endereco } from "src/app/enderecos/models/endereco"

export interface Cliente {
  idCliente?: number
  nome: string
  email: string
  enderecoCliente?: Endereco
}
