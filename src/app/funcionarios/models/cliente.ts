import { Endereco } from "./endereco"

export interface Cliente {
    idCliente?: number
    email: string
    nome: string
    enderecoCliente: Endereco
}