import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { disponiveis, type Categoria } from '../data/veiculos'
import { faixasPreco } from '../lib/filtros'
import { formatarMoeda } from '../lib/format'
import { IconSearch } from './Icons'

const marcas = [...new Set(disponiveis.map((v) => v.marca))].sort()
const categorias = (['SUV', 'Picape', 'Hatch', 'Sedã'] as Categoria[]).filter((c) => disponiveis.some((v) => v.categoria === c))
const anos = [...new Set(disponiveis.map((v) => v.anoModelo))].sort((a, b) => b - a)

// Barra de busca da página inicial. Leva para /estoque com os filtros na URL.
export function BuscaRapida() {
  const navegar = useNavigate()
  const [marca, setMarca] = useState('')
  const [categoria, setCategoria] = useState('')
  const [preco, setPreco] = useState('')
  const [ano, setAno] = useState('')

  const buscar = (e: FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (marca) params.set('marca', marca)
    if (categoria) params.set('categoria', categoria)
    if (preco) params.set('preco', preco)
    if (ano) params.set('ano', ano)
    const qs = params.toString()
    navegar(`/estoque${qs ? `?${qs}` : ''}`)
  }

  return (
    <form className="busca" onSubmit={buscar}>
      <label>
        <span>Marca</span>
        <select value={marca} onChange={(e) => setMarca(e.target.value)}>
          <option value="">Todas</option>
          {marcas.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </label>
      <label>
        <span>Categoria</span>
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="">Todas</option>
          {categorias.map((c) => (
            <option key={c}>{c}</option>
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
      <button type="submit" className="busca__botao">
        <IconSearch size={18} /> Buscar
      </button>
    </form>
  )
}
