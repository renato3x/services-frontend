import { Endereco } from "./endereco";

export interface Cliente{
    idCliente?: number,
    nome: string,
    email: string,
    enderecoCliente?: Endereco

}