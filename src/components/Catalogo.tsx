import { useMemo, useState } from 'react'
import type { Categoria, Veiculo } from '../data/veiculos'
import { nomeCompleto } from '../lib/format'
import { VeiculoCard } from './VeiculoCard'
import { IconSearch } from './Icons'
import { linkWhatsApp } from '../config/loja'

type Ordem = 'recentes' | 'menor-preco' | 'maior-preco' | 'mais-novo'

const categorias: Categoria[] = ['Hatch', 'Sedã', 'SUV', 'Picape']

const normalizar = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export function Catalogo({ veiculos }: { veiculos: Veiculo[] }) {
  const [busca, setBusca] = useState('')
  const [marca, setMarca] = useState('')
  const [categoria, setCategoria] = useState<Categoria | ''>('')
  const [ordem, setOrdem] = useState<Ordem>('recentes')

  const marcas = useMemo(() => [...new Set(veiculos.map((v) => v.marca))].sort(), [veiculos])
  const categoriasComEstoque = categorias.filter((c) => veiculos.some((v) => v.categoria === c))

  const lista = useMemo(() => {
    const termo = normalizar(busca.trim())
    const filtrados = veiculos.filter(
      (v) =>
        (!marca || v.marca === marca) &&
        (!categoria || v.categoria === categoria) &&
        (!termo || normalizar(`${nomeCompleto(v)} ${v.anoModelo ?? ''} ${v.cor ?? ''}`).includes(termo)),
    )
    const semPreco = (v: Veiculo, fallback: number) => v.preco ?? fallback
    return filtrados.sort((a, b) => {
      switch (ordem) {
        case 'menor-preco':
          return semPreco(a, Infinity) - semPreco(b, Infinity)
        case 'maior-preco':
          return semPreco(b, -Infinity) - semPreco(a, -Infinity)
        case 'mais-novo':
          return (b.anoModelo ?? 0) - (a.anoModelo ?? 0)
        default:
          return b.entrada.localeCompare(a.entrada)
      }
    })
  }, [veiculos, busca, marca, categoria, ordem])

  const temFiltro = busca || marca || categoria
  const limpar = () => {
    setBusca('')
    setMarca('')
    setCategoria('')
  }

  return (
    <>
      <div className="filtros">
        <label className="filtros__busca">
          <IconSearch size={18} />
          <span className="sr-only">Buscar veículo</span>
          <input
            type="search"
            placeholder="Buscar modelo, marca ou ano"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </label>

        <label className="filtros__campo">
          <span className="sr-only">Marca</span>
          <select value={marca} onChange={(e) => setMarca(e.target.value)}>
            <option value="">Todas as marcas</option>
            {marcas.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </label>

        <label className="filtros__campo">
          <span className="sr-only">Ordenar</span>
          <select value={ordem} onChange={(e) => setOrdem(e.target.value as Ordem)}>
            <option value="recentes">Chegaram por último</option>
            <option value="mais-novo">Ano mais novo</option>
            <option value="menor-preco">Menor preço</option>
            <option value="maior-preco">Maior preço</option>
          </select>
        </label>
      </div>

      <div className="chips" role="group" aria-label="Categoria">
        <button className={`chip ${categoria === '' ? 'is-ativo' : ''}`} onClick={() => setCategoria('')}>
          Todos
        </button>
        {categoriasComEstoque.map((c) => (
          <button
            key={c}
            className={`chip ${categoria === c ? 'is-ativo' : ''}`}
            onClick={() => setCategoria(categoria === c ? '' : c)}
          >
            {c}
          </button>
        ))}
        <span className="chips__total" aria-live="polite">
          {lista.length} {lista.length === 1 ? 'veículo' : 'veículos'}
        </span>
      </div>

      {lista.length > 0 ? (
        <div className="grade">
          {lista.map((v) => (
            <VeiculoCard key={v.id} veiculo={v} />
          ))}
        </div>
      ) : (
        <div className="vazio">
          <p>Nenhum veículo encontrado com esses filtros.</p>
          <p className="vazio__sub">
            O estoque gira rápido. Diga o que procura e avisamos quando chegar.
          </p>
          <div className="vazio__acoes">
            {temFiltro && (
              <button className="btn btn--contorno" onClick={limpar}>
                Limpar filtros
              </button>
            )}
            <a
              className="btn btn--whats"
              href={linkWhatsApp(`Olá! Estou procurando ${busca || 'um veículo'}. Têm algo assim?`)}
              target="_blank"
              rel="noreferrer"
            >
              Avisar pelo WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  )
}
