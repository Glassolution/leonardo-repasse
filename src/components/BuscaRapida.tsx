import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Categoria } from '../data/veiculos'
import { disponiveis } from '../data/veiculos'
import { faixasPreco } from '../lib/filtros'
import { formatarMoeda } from '../lib/format'
import { linkWhatsApp } from '../config/loja'
import { IconSearch, IconWhatsApp } from './Icons'

const abas: ('' | Categoria)[] = ['', 'SUV', 'Sedã', 'Hatch', 'Picape']
const marcas = [...new Set(disponiveis.map((v) => v.marca))].sort()
const anos = [...new Set(disponiveis.map((v) => v.anoModelo))].sort((a, b) => b - a)

// Caixa de busca da página inicial. Leva para /estoque com os filtros na URL.
export function BuscaRapida() {
  const navegar = useNavigate()
  const [categoria, setCategoria] = useState<'' | Categoria>('')
  const [marca, setMarca] = useState('')
  const [preco, setPreco] = useState('')
  const [ano, setAno] = useState('')

  const buscar = (e: FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (categoria) params.set('categoria', categoria)
    if (marca) params.set('marca', marca)
    if (preco) params.set('preco', preco)
    if (ano) params.set('ano', ano)
    const qs = params.toString()
    navegar(`/estoque${qs ? `?${qs}` : ''}`)
  }

  return (
    <form className="busca" onSubmit={buscar}>
      <div className="busca__topo">
        <div className="busca__abas" role="tablist" aria-label="Categoria">
          {abas.map((a) => (
            <button
              key={a || 'todos'}
              type="button"
              role="tab"
              aria-selected={categoria === a}
              className={categoria === a ? 'is-ativa' : ''}
              onClick={() => setCategoria(a)}
            >
              {a || 'Todos'}
            </button>
          ))}
        </div>
        <a className="busca__ajuda" href={linkWhatsApp('Olá! Pode me ajudar a escolher um carro?')} target="_blank" rel="noreferrer">
          <IconWhatsApp size={16} /> Precisa de ajuda?
        </a>
      </div>

      <div className="busca__campos">
        <label>
          <span>Marca</span>
          <select value={marca} onChange={(e) => setMarca(e.target.value)}>
            <option value="">Todas as marcas</option>
            {marcas.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Preço até</span>
          <select value={preco} onChange={(e) => setPreco(e.target.value)}>
            <option value="">Qualquer valor</option>
            {faixasPreco.map((p) => (
              <option key={p} value={p}>
                {formatarMoeda(p)}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Ano a partir de</span>
          <select value={ano} onChange={(e) => setAno(e.target.value)}>
            <option value="">Qualquer ano</option>
            {anos.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </label>
        <button type="submit" className="btn btn--azul busca__botao">
          <IconSearch size={18} /> Buscar veículos
        </button>
      </div>
    </form>
  )
}
