import { useMemo, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { disponiveis, type Categoria } from '../data/veiculos'
import { aplicarFiltros, faixasPreco, filtrosVazios } from '../lib/filtros'
import { formatarMoeda } from '../lib/format'
import { IconSearch } from './Icons'
import { Seletor, type Opcao } from './Seletor'

const marcas = [...new Set(disponiveis.map((v) => v.marca))].sort()
const categorias: Categoria[] = ['SUV', 'Sedã', 'Hatch', 'Picape']
const anos = [...new Set(disponiveis.map((v) => v.anoModelo))].sort((a, b) => b - a)

type Escolha = { marca: string; categoria: string; preco: string; ano: string }

const contar = (e: Escolha) =>
  aplicarFiltros(disponiveis, {
    ...filtrosVazios,
    marca: e.marca,
    categorias: e.categoria ? [e.categoria as Categoria] : [],
    precoMax: Number(e.preco) || 0,
    anoMin: Number(e.ano) || 0,
  }).length

// Barra de busca da página inicial. Leva para /estoque com os filtros na URL.
export function BuscaRapida() {
  const navegar = useNavigate()
  const [e, setE] = useState<Escolha>({ marca: '', categoria: '', preco: '', ano: '' })
  const mudar = (campo: keyof Escolha) => (valor: string) => setE((atual) => ({ ...atual, [campo]: valor }))

  // Cada opção mostra quantos carros sobram combinando com os outros campos já escolhidos.
  const opcoes = useMemo(() => {
    const com = (campo: keyof Escolha, valor: string) => contar({ ...e, [campo]: valor })
    return {
      marca: [{ valor: '', rotulo: 'Todas' }, ...marcas.map((m) => ({ valor: m, rotulo: m, total: com('marca', m) }))],
      categoria: [
        { valor: '', rotulo: 'Todas' },
        ...categorias.map((c) => ({ valor: c, rotulo: c, total: com('categoria', c) })),
      ],
      preco: [
        { valor: '', rotulo: 'Qualquer valor' },
        ...faixasPreco.map((p) => ({ valor: String(p), rotulo: `Até ${formatarMoeda(p)}`, total: com('preco', String(p)) })),
      ],
      ano: [
        { valor: '', rotulo: 'Qualquer ano' },
        ...anos.map((a) => ({ valor: String(a), rotulo: `${a} ou mais novo`, total: com('ano', String(a)) })),
      ],
    } satisfies Record<keyof Escolha, Opcao[]>
  }, [e])

  const total = contar(e)

  const buscar = (ev: FormEvent) => {
    ev.preventDefault()
    const params = new URLSearchParams()
    if (e.marca) params.set('marca', e.marca)
    if (e.categoria) params.set('categoria', e.categoria)
    if (e.preco) params.set('preco', e.preco)
    if (e.ano) params.set('ano', e.ano)
    const qs = params.toString()
    navegar(`/estoque${qs ? `?${qs}` : ''}`)
  }

  return (
    <form className="busca" onSubmit={buscar}>
      <Seletor rotulo="Marca" valor={e.marca} opcoes={opcoes.marca} onChange={mudar('marca')} />
      <Seletor rotulo="Categoria" valor={e.categoria} opcoes={opcoes.categoria} onChange={mudar('categoria')} />
      <Seletor rotulo="Preço até" valor={e.preco} opcoes={opcoes.preco} onChange={mudar('preco')} />
      <Seletor rotulo="Ano a partir de" valor={e.ano} opcoes={opcoes.ano} onChange={mudar('ano')} />
      <button type="submit" className="busca__botao" disabled={total === 0}>
        <IconSearch size={18} />
        <span>
          {total === 0 ? 'Nenhum carro' : 'Buscar'}
          <small>
            {total} {total === 1 ? 'carro' : 'carros'}
          </small>
        </span>
      </button>
    </form>
  )
}
