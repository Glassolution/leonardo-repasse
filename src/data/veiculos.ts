export type Categoria = 'Hatch' | 'Sedã' | 'SUV' | 'Picape'
export type Status = 'disponivel' | 'reservado' | 'vendido'

export type Veiculo = {
  /** Usado na URL: /veiculo/<id>. Sem espaços nem acentos. */
  id: string
  marca: string
  modelo: string
  versao?: string
  categoria: Categoria
  anoFabricacao?: number
  anoModelo?: number
  km?: number
  cambio?: 'Manual' | 'Automático' | 'CVT'
  combustivel?: 'Flex' | 'Gasolina' | 'Diesel' | 'Híbrido' | 'Elétrico'
  cor?: string
  /** Sem preço, o site mostra "Consultar valor". */
  preco?: number
  /** Caminhos dentro de /public. Ex.: '/veiculos/hrv-exl-2025/1.jpg' */
  fotos: string[]
  status: Status
  observacoes?: string
  /** Data de entrada no estoque (AAAA-MM-DD), usada para ordenar. */
  entrada: string
}

// Estoque de exemplo montado a partir das publicações do Instagram.
// Substitua pelos veículos reais, com preço, km e fotos.
export const veiculos: Veiculo[] = [
  {
    id: 'honda-hr-v-exl-2025',
    marca: 'Honda',
    modelo: 'HR-V',
    versao: 'EXL',
    categoria: 'SUV',
    anoFabricacao: 2025,
    anoModelo: 2025,
    cambio: 'CVT',
    combustivel: 'Flex',
    cor: 'Branco',
    fotos: [],
    status: 'disponivel',
    entrada: '2026-10-20',
  },
  {
    id: 'nissan-kicks-2024',
    marca: 'Nissan',
    modelo: 'Kicks',
    categoria: 'SUV',
    anoFabricacao: 2024,
    anoModelo: 2024,
    combustivel: 'Flex',
    cor: 'Branco',
    fotos: [],
    status: 'disponivel',
    entrada: '2026-10-14',
  },
  {
    id: 'vw-voyage-2017',
    marca: 'Volkswagen',
    modelo: 'Voyage',
    categoria: 'Sedã',
    anoFabricacao: 2017,
    anoModelo: 2017,
    combustivel: 'Flex',
    cor: 'Branco',
    fotos: [],
    status: 'disponivel',
    entrada: '2026-10-08',
  },
  {
    id: 'fiat-strada',
    marca: 'Fiat',
    modelo: 'Strada',
    categoria: 'Picape',
    combustivel: 'Flex',
    cor: 'Branco',
    fotos: [],
    status: 'disponivel',
    entrada: '2026-10-02',
  },
  {
    id: 'vw-nivus',
    marca: 'Volkswagen',
    modelo: 'Nivus',
    categoria: 'SUV',
    cor: 'Preto',
    fotos: [],
    status: 'vendido',
    entrada: '2026-09-28',
  },
  {
    id: 'chevrolet-onix-plus',
    marca: 'Chevrolet',
    modelo: 'Onix Plus',
    categoria: 'Sedã',
    cor: 'Preto',
    fotos: [],
    status: 'vendido',
    entrada: '2026-09-22',
  },
  {
    id: 'hyundai-hb20s',
    marca: 'Hyundai',
    modelo: 'HB20S',
    categoria: 'Sedã',
    cor: 'Branco',
    fotos: [],
    status: 'vendido',
    entrada: '2026-09-15',
  },
  {
    id: 'chevrolet-onix',
    marca: 'Chevrolet',
    modelo: 'Onix',
    categoria: 'Hatch',
    cor: 'Prata',
    fotos: [],
    status: 'vendido',
    entrada: '2026-09-09',
  },
]
