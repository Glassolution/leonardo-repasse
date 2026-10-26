import type { Veiculo } from '../data/veiculos'

const moeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

const numero = new Intl.NumberFormat('pt-BR')

export const formatarPreco = (valor?: number) => (valor ? moeda.format(valor) : 'Consultar valor')

export const formatarKm = (km: number) => `${numero.format(km)} km`

export function formatarAno(v: Veiculo) {
  if (!v.anoModelo) return undefined
  if (!v.anoFabricacao || v.anoFabricacao === v.anoModelo) return String(v.anoModelo)
  return `${v.anoFabricacao}/${v.anoModelo}`
}

export const nomeCompleto = (v: Veiculo) => [v.marca, v.modelo, v.versao].filter(Boolean).join(' ')

export function mensagemInteresse(v: Veiculo) {
  const ano = formatarAno(v)
  return `Olá! Tenho interesse no ${nomeCompleto(v)}${ano ? ` ${ano}` : ''} que vi no site. Ainda está disponível?`
}
