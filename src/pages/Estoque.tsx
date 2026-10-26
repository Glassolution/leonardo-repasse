import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { disponiveis, type Categoria } from '../data/veiculos'
import { CardEstoque } from '../components/CardEstoque'
import { IconClose, IconInfo, IconWhatsApp } from '../components/Icons'
import { aplicarFiltros, contarFiltros, faixasPreco, filtrosDaUrl, filtrosVazios, type Filtros, type Ordem } from '../lib/filtros'
import { formatarMoeda } from '../lib/format'
import { linkWhatsApp, loja } from '../config/loja'

const unicos = <T,>(lista: T[]) => [...new Set(lista)]

const marcas = unicos(disponiveis.map((v) => v.marca)).sort()
const categorias = (['Hatch', 'Sedã', 'SUV', 'Picape'] as Categoria[]).filter((c) =>
  disponiveis.some((v) => v.categoria === c),
)
const combustiveis = unicos(disponiveis.map((v) => v.combustivel)).sort()
const itens = unicos(disponiveis.flatMap((v) => v.itens)).sort()
const anos = unicos(disponiveis.map((v) => v.anoModelo)).sort((a, b) => b - a)

const coresHex: Record<string, string> = {
  Branco: '#ffffff',
  Preto: '#1b1b1d',
  Prata: '#c9ccd1',
  Cinza: '#6e7178',
  Vermelho: '#b3261e',
  Azul: '#1f3f9e',
  Verde: '#2f6b47',
  Marrom: '#6b4a32',
}
const cores = unicos(disponiveis.map((v) => v.cor))

function Grupo({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <fieldset className="filtro">
      <legend>{titulo}</legend>
      {children}
    </fieldset>
  )
}

function alternar<T>(lista: T[], valor: T) {
  return lista.includes(valor) ? lista.filter((v) => v !== valor) : [...lista, valor]
}

export default function Estoque() {
  const [params] = useSearchParams()
  const [f, setF] = useState<Filtros>(() => filtrosDaUrl(params))
  const [painelAberto, setPainelAberto] = useState(false)

  useEffect(() => {
    document.title = `Estoque | ${loja.nome}`
  }, [])

  const lista = useMemo(() => aplicarFiltros(disponiveis, f), [f])
  const ativos = contarFiltros(f)
  const set = <K extends keyof Filtros>(chave: K, valor: Filtros[K]) => setF((atual) => ({ ...atual, [chave]: valor }))
  const limpar = () => setF({ ...filtrosVazios, ordem: f.ordem })

  return (
    <div className="estoque">
      <div className="estoque__cabecalho">
        <div className="container">
          <h1>Estoque</h1>
        </div>
      </div>

      <div className="container estoque__corpo">
        <aside className={`filtros ${painelAberto ? 'is-open' : ''}`} aria-label="Filtros">
          <div className="filtros__topo-mobile">
            <strong>Filtros</strong>
            <button onClick={() => setPainelAberto(false)} aria-label="Fechar filtros">
              <IconClose size={22} />
            </button>
          </div>

          <div className="filtro">
            <label className="filtro__rotulo" htmlFor="busca">
              Buscar
              <span>Modelo, versão ou ano</span>
            </label>
            <input
              id="busca"
              className="filtro__input"
              type="search"
              placeholder="Ex.: Hilux 2021"
              value={f.busca}
              onChange={(e) => set('busca', e.target.value)}
            />
          </div>

          <div className="filtro">
            <label className="filtro__rotulo" htmlFor="preco">
              Preço até
            </label>
            <select id="preco" className="filtro__input" value={f.precoMax} onChange={(e) => set('precoMax', Number(e.target.value))}>
              <option value={0}>Qualquer valor</option>
              {faixasPreco.map((p) => (
                <option key={p} value={p}>
                  {formatarMoeda(p)}
                </option>
              ))}
            </select>
          </div>

          <div className="filtro filtro--colunas">
            <Grupo titulo="Marca">
              {['', ...marcas].map((m) => (
                <label key={m || 'todas'} className="opcao opcao--radio">
                  <input type="radio" name="marca" checked={f.marca === m} onChange={() => set('marca', m)} />
                  <span>{m || 'Todas'}</span>
                </label>
              ))}
            </Grupo>
            <Grupo titulo="Câmbio">
              {(['', 'Automático', 'Manual'] as const).map((c) => (
                <label key={c || 'todos'} className="opcao opcao--radio">
                  <input type="radio" name="cambio" checked={f.cambio === c} onChange={() => set('cambio', c)} />
                  <span>{c || 'Todos'}</span>
                </label>
              ))}
            </Grupo>
          </div>

          <div className="filtro">
            <label className="opcao opcao--switch">
              <input type="checkbox" checked={f.soAbaixoFipe} onChange={(e) => set('soAbaixoFipe', e.target.checked)} />
              <span className="switch" aria-hidden />
              <span>
                Somente abaixo da FIPE
                <small>Valor menor que a tabela do mês</small>
              </span>
            </label>
          </div>

          <Grupo titulo="Categoria">
            {categorias.map((c) => (
              <label key={c} className="opcao opcao--check">
                <input type="checkbox" checked={f.categorias.includes(c)} onChange={() => set('categorias', alternar(f.categorias, c))} />
                <span>{c}</span>
              </label>
            ))}
          </Grupo>

          <Grupo titulo="Cor">
            <div className="cores">
              {cores.map((c) => (
                <label key={c} className="cor" title={c}>
                  <input type="checkbox" checked={f.cores.includes(c)} onChange={() => set('cores', alternar(f.cores, c))} />
                  <span style={{ background: coresHex[c] ?? '#999' }} />
                  <span className="sr-only">{c}</span>
                </label>
              ))}
            </div>
          </Grupo>

          <Grupo titulo="Ano a partir de">
            <select className="filtro__input" value={f.anoMin} onChange={(e) => set('anoMin', Number(e.target.value))}>
              <option value={0}>Qualquer ano</option>
              {anos.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </Grupo>

          <Grupo titulo="Combustível">
            {combustiveis.map((c) => (
              <label key={c} className="opcao opcao--check">
                <input type="checkbox" checked={f.combustiveis.includes(c)} onChange={() => set('combustiveis', alternar(f.combustiveis, c))} />
                <span>{c}</span>
              </label>
            ))}
          </Grupo>

          <Grupo titulo="Itens">
            {itens.map((i) => (
              <label key={i} className="opcao opcao--check">
                <input type="checkbox" checked={f.itens.includes(i)} onChange={() => set('itens', alternar(f.itens, i))} />
                <span>{i}</span>
              </label>
            ))}
          </Grupo>

          <div className="filtros__acoes-mobile">
            <button className="btn btn--contorno" onClick={limpar}>
              Limpar
            </button>
            <button className="btn btn--azul" onClick={() => setPainelAberto(false)}>
              Ver {lista.length} {lista.length === 1 ? 'veículo' : 'veículos'}
            </button>
          </div>
        </aside>

        <div className="estoque__resultados">
          <div className="estoque__barra">
            <p className="estoque__aviso">
              {lista.length} {lista.length === 1 ? 'veículo disponível' : 'veículos disponíveis'} · valores sujeitos a
              confirmação <IconInfo size={14} />
            </p>
            <div className="estoque__barra-acoes">
              <button className="btn btn--contorno btn--p estoque__abrir" onClick={() => setPainelAberto(true)}>
                Filtros{ativos > 0 && ` (${ativos})`}
              </button>
              {ativos > 0 && (
                <button className="estoque__limpar" onClick={limpar}>
                  Limpar filtros
                </button>
              )}
              <select className="estoque__ordem" value={f.ordem} onChange={(e) => set('ordem', e.target.value as Ordem)} aria-label="Ordenar">
                <option value="recentes">Mais recentes</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
                <option value="menor-km">Menor km</option>
                <option value="mais-novo">Ano mais novo</option>
              </select>
            </div>
          </div>

          {lista.length > 0 ? (
            <div className="estoque__grade">
              {lista.map((v) => (
                <CardEstoque key={v.id} veiculo={v} />
              ))}
            </div>
          ) : (
            <div className="estoque__vazio">
              <p>Nenhum veículo com esses filtros.</p>
              <span>O estoque muda rápido. Diga o que procura e avisamos quando chegar.</span>
              <div>
                <button className="btn btn--contorno" onClick={limpar}>
                  Limpar filtros
                </button>
                <a
                  className="btn btn--whats"
                  href={linkWhatsApp(`Olá! Estou procurando ${f.busca || 'um carro'}. Têm algo assim?`)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconWhatsApp size={18} /> Avisar pelo WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
