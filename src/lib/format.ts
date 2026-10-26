import type { Veiculo } from '../data/veiculos'

const moeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

const numero = new Intl.NumberFormat('pt-BR')

export const formatarMoeda = (valor: number) => moeda.format(valor)

export const formatarPreco = (valor?: number) => (valor ? moeda.format(valor) : 'Consultar valor')

export const formatarKm = (km: number) => `${numero.format(km)} km`

/** 31200 -> "31 mil" */
export const kmCurto = (km: number) => (km >= 1000 ? `${Math.round(km / 1000)} mil` : String(km))

export const formatarAno = (v: Veiculo) =>
  v.anoFabricacao === v.anoModelo ? String(v.anoModelo) : `${v.anoFabricacao}/${v.anoModelo}`

export const nomeCompleto = (v: Veiculo) => `${v.marca} ${v.modelo} ${v.versao}`

/** Diferença positiva entre FIPE e preço, ou undefined. */
export const abaixoFipe = (v: Veiculo) =>
  v.fipe && v.preco && v.fipe > v.preco ? v.fipe - v.preco : undefined

export const mensagemInteresse = (v: Veiculo) =>
  `Olá! Tenho interesse no ${nomeCompleto(v)} ${formatarAno(v)} que vi no site. Ainda está disponível?`
