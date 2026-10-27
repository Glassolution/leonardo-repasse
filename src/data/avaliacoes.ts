export type Avaliacao = {
  nome: string
  cidade: string
  /** De 1 a 5. */
  nota: number
  texto: string
  /** Opcional. Caminho em /public, ex.: '/clientes/joao.jpg'. Sem foto, mostra as iniciais. */
  foto?: string
}

// Avaliações reais de clientes (ex.: copiadas do Google ou do Instagram, com autorização).
// A seção "O que dizem nossos clientes" só aparece na página inicial quando esta lista tiver itens.
//
// Exemplo de formato:
// { nome: 'Nome do cliente', cidade: 'Marabá - PA', nota: 5, texto: 'Comentário do cliente.' },
export const avaliacoes: Avaliacao[] = []
