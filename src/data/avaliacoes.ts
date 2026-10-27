export type Avaliacao = {
  /** Como o cliente aparece no card. Ex.: 'Cliente', 'Cliente lojista'. */
  nome: string
  cidade: string
  /** De 1 a 5. */
  nota: number
  texto: string
  /** Opcional. Caminho em /public, ex.: '/clientes/joao.jpg'. Sem foto, mostra um ícone. */
  foto?: string
}

// MVP: textos genéricos só para demonstração do layout.
// Antes de publicar, troque por avaliações reais de clientes (com autorização) ou esvazie a lista;
// com a lista vazia a seção some da página inicial.
export const avaliacoes: Avaliacao[] = [
  {
    nome: 'Cliente',
    cidade: 'Marabá - PA',
    nota: 5,
    texto: 'Atendimento rápido pelo WhatsApp e o carro estava do jeito que aparecia nas fotos.',
  },
  {
    nome: 'Cliente lojista',
    cidade: 'Região de Marabá',
    nota: 5,
    texto: 'Peguei carro para revenda. Negociação direta, sem enrolação, e valor abaixo da FIPE.',
  },
  {
    nome: 'Cliente',
    cidade: 'Marabá - PA',
    nota: 4,
    texto: 'Fui ao pátio conferir antes de fechar. Tudo explicado e documentação em ordem.',
  },
  {
    nome: 'Cliente',
    cidade: 'Parauapebas - PA',
    nota: 5,
    texto: 'Achei o carro que queria pelo site, mandei mensagem e no mesmo dia já estava vendo ele no pátio.',
  },
  {
    nome: 'Cliente lojista',
    cidade: 'Marabá - PA',
    nota: 5,
    texto: 'Recebo a lista de repasse com fotos de cada carro. Facilita muito na hora de escolher para a loja.',
  },
  {
    nome: 'Cliente',
    cidade: 'Marabá - PA',
    nota: 5,
    texto: 'Bom preço, carro revisado e atendimento atencioso do começo ao fim.',
  },
]
