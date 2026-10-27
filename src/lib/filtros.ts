import type { Categoria, Veiculo } from '../data/veiculos'
import { abaixoFipe, nomeCompleto } from './format'

export type Ordem = 'recentes' | 'menor-preco' | 'maior-preco' | 'menor-km' | 'mais-novo'

export type Filtros = {
  busca: string
  marca: string
  cambio: '' | 'Automático' | 'Manual'
  precoMin: number
  precoMax: number
  anoMin: number
  categorias: Categoria[]
  cores: string[]
  combustiveis: string[]
  itens: string[]
  soAbaixoFipe: boolean
  ordem: Ordem
}

export const filtrosVazios: Filtros = {
  busca: '',
  marca: '',
  cambio: '',
  precoMin: 0,
  precoMax: 0,
  anoMin: 0,
  categorias: [],
  cores: [],
  combustiveis: [],
  itens: [],
  soAbaixoFipe: false,
  ordem: 'recentes',
}

export const faixasPreco = [60000, 80000, 100000, 130000, 170000, 250000]

/** Lê os filtros vindos da busca da página inicial (?marca=&categoria=&preco=&ano=). */
export function filtrosDaUrl(params: URLSearchParams): Filtros {
  const categoria = params.get('categoria') as Categoria | null
  return {
    ...filtrosVazios,
    marca: params.get('marca') ?? '',
    categorias: categoria ? [categoria] : [],
    precoMax: Number(params.get('preco')) || 0,
    anoMin: Number(params.get('ano')) || 0,
  }
}

const normalizar = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

const ehAutomatico = (v: Veiculo) => v.cambio !== 'Manual'

export function aplicarFiltros(lista: Veiculo[], f: Filtros) {
  const termo = normalizar(f.busca.trim())
  const filtrados = lista.filter(
    (v) =>
      (!termo || normalizar(`${nomeCompleto(v)} ${v.anoModelo} ${v.cor}`).includes(termo)) &&
      (!f.marca || v.marca === f.marca) &&
      (!f.cambio || (f.cambio === 'Manual' ? !ehAutomatico(v) : ehAutomatico(v))) &&
      (!f.precoMin || (v.preco !== undefined && v.preco >= f.precoMin)) &&
      (!f.precoMax || (v.preco !== undefined && v.preco <= f.precoMax)) &&
      (!f.anoMin || v.anoModelo >= f.anoMin) &&
      (!f.categorias.length || f.categorias.includes(v.categoria)) &&
      (!f.cores.length || f.cores.includes(v.cor)) &&
      (!f.combustiveis.length || f.combustiveis.includes(v.combustivel)) &&
      (!f.itens.length || f.itens.every((i) => v.itens.includes(i))) &&
      (!f.soAbaixoFipe || abaixoFipe(v) !== undefined),
  )

  return filtrados.sort((a, b) => {
    switch (f.ordem) {
      case 'menor-preco':
        return (a.preco ?? Infinity) - (b.preco ?? Infinity)
      case 'maior-preco':
        return (b.preco ?? -Infinity) - (a.preco ?? -Infinity)
      case 'menor-km':
        return a.km - b.km
      case 'mais-novo':
        return b.anoModelo - a.anoModelo
      default:
        return b.entrada.localeCompare(a.entrada)
    }
  })
}

export const contarFiltros = (f: Filtros) =>
  [f.busca, f.marca, f.cambio, f.precoMin || f.precoMax, f.anoMin, f.soAbaixoFipe].filter(Boolean).length +
  f.categorias.length +
  f.cores.length +
  f.combustiveis.length +
  f.itens.length
