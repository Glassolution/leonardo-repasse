import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { disponiveis, type Categoria } from '../data/veiculos'
import { CardEstoque } from '../components/CardEstoque'
import { IconChevron, IconClose, IconSearch, IconWhatsApp } from '../components/Icons'
import { aplicarFiltros, contarFiltros, filtrosDaUrl, filtrosVazios, type Filtros, type Ordem } from '../lib/filtros'
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

// Faixa de preço do estoque, arredondada de 5 em 5 mil, e histograma para o filtro.
const precos = disponiveis.flatMap((v) => (v.preco ? [v.preco] : []))
const PASSO = 5000
const PRECO_MIN = Math.floor(Math.min(...precos) / PASSO) * PASSO
const PRECO_MAX = Math.ceil(Math.max(...precos) / PASSO) * PASSO
const BARRAS = 14
const histograma = Array.from({ length: BARRAS }, (_, i) => {
  const ini = PRECO_MIN + ((PRECO_MAX - PRECO_MIN) / BARRAS) * i
  const fim = ini + (PRECO_MAX - PRECO_MIN) / BARRAS
  return { ini, fim, total: precos.filter((p) => p >= ini && (i === BARRAS - 1 ? p <= fim : p < fim)).length }
})
const maiorBarra = Math.max(...histograma.map((b) => b.total), 1)

const MARCAS_VISIVEIS = 4

const milhar = (v: number) => `R$ ${Math.round(v / 1000)} mil`

function Bloco({ titulo, children, acao }: { titulo: string; children: ReactNode; acao?: ReactNode }) {
  return (
    <fieldset className="fb">
      <div className="fb__topo">
        <legend>{titulo}</legend>
        {acao}
      </div>
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
  const [gavetaAberta, setGavetaAberta] = useState(false)
  const [lateralOculta, setLateralOculta] = useState(false)
  const [todasMarcas, setTodasMarcas] = useState(false)

  useEffect(() => {
    document.title = `Estoque | ${loja.nome}`
  }, [])

  const lista = useMemo(() => aplicarFiltros(disponiveis, f), [f])
  const ativos = contarFiltros(f)
  const set = <K extends keyof Filtros>(chave: K, valor: Filtros[K]) => setF((atual) => ({ ...atual, [chave]: valor }))
  const limpar = () => setF({ ...filtrosVazios, ordem: f.ordem })

  const abrirFiltros = () => {
    if (window.matchMedia('(max-width: 900px)').matches) setGavetaAberta(true)
    else setLateralOculta((v) => !v)
  }

  const lo = Math.max(f.precoMin || PRECO_MIN, PRECO_MIN)
  const hi = Math.min(f.precoMax || PRECO_MAX, PRECO_MAX)
  const pct = (v: number) => ((v - PRECO_MIN) / (PRECO_MAX - PRECO_MIN)) * 100

  const mudarMin = (v: number) => set('precoMin', Math.min(v, hi - PASSO) <= PRECO_MIN ? 0 : Math.min(v, hi - PASSO))
  const mudarMax = (v: number) => set('precoMax', Math.max(v, lo + PASSO) >= PRECO_MAX ? 0 : Math.max(v, lo + PASSO))

  // Etiquetas dos filtros ativos, com botão para remover cada um.
  const etiquetas: { rotulo: string; remover: () => void }[] = [
    f.busca && { rotulo: `"${f.busca}"`, remover: () => set('busca', '') },
    f.soAbaixoFipe && { rotulo: 'Abaixo da FIPE', remover: () => set('soAbaixoFipe', false) },
    f.marca && { rotulo: f.marca, remover: () => set('marca', '') },
    f.cambio && { rotulo: f.cambio, remover: () => set('cambio', '') },
    (f.precoMin || f.precoMax) && {
      rotulo: !f.precoMin
        ? `Até ${formatarMoeda(hi)}`
        : !f.precoMax
          ? `A partir de ${formatarMoeda(lo)}`
          : `${formatarMoeda(lo)} – ${formatarMoeda(hi)}`,
      remover: () => setF((a) => ({ ...a, precoMin: 0, precoMax: 0 })),
    },
    f.anoMin && { rotulo: `A partir de ${f.anoMin}`, remover: () => set('anoMin', 0) },
    ...f.categorias.map((c) => ({ rotulo: c, remover: () => set('categorias', alternar(f.categorias, c)) })),
    ...f.cores.map((c) => ({ rotulo: c, remover: () => set('cores', alternar(f.cores, c)) })),
    ...f.combustiveis.map((c) => ({ rotulo: c, remover: () => set('combustiveis', alternar(f.combustiveis, c)) })),
    ...f.itens.map((i) => ({ rotulo: i, remover: () => set('itens', alternar(f.itens, i)) })),
  ].filter((e): e is { rotulo: string; remover: () => void } => Boolean(e))

  const marcasExibidas = todasMarcas ? marcas : marcas.slice(0, MARCAS_VISIVEIS)

  return (
    <div className="cat">
      <div className="container">
        <div className="cat__painel">
          <div className="cat__barra">
            <div className="cat__segmento" role="tablist" aria-label="Tipo de oferta">
              <button role="tab" aria-selected={!f.soAbaixoFipe} className={!f.soAbaixoFipe ? 'is-ativo' : ''} onClick={() => set('soAbaixoFipe', false)}>
                Todos
              </button>
              <button role="tab" aria-selected={f.soAbaixoFipe} className={f.soAbaixoFipe ? 'is-ativo' : ''} onClick={() => set('soAbaixoFipe', true)}>
                Abaixo da FIPE
              </button>
            </div>

            <label className="cat__busca">
              <IconSearch size={18} />
              <span className="sr-only">Buscar veículo</span>
              <input type="search" placeholder="Buscar modelo, versão ou ano..." value={f.busca} onChange={(e) => set('busca', e.target.value)} />
            </label>

            <button className="cat__botao" onClick={abrirFiltros} aria-expanded={!lateralOculta}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
                <circle cx="16" cy="7" r="2" />
                <circle cx="10" cy="17" r="2" />
              </svg>
              Filtros{ativos > 0 && <span className="cat__contagem">{ativos}</span>}
            </button>

            <label className="cat__ordem">
              <span>Ordenar:</span>
              <select value={f.ordem} onChange={(e) => set('ordem', e.target.value as Ordem)}>
                <option value="recentes">Mais recentes</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
                <option value="menor-km">Menor km</option>
                <option value="mais-novo">Ano mais novo</option>
              </select>
            </label>
          </div>

          <div className={`cat__corpo ${lateralOculta ? 'cat__corpo--sem-lateral' : ''}`}>
            <aside className={`cat__lateral ${gavetaAberta ? 'is-open' : ''}`} aria-label="Filtros">
              <div className="cat__lateral-topo">
                <strong>Filtros</strong>
                <button className="cat__limpar" onClick={limpar} disabled={ativos === 0}>
                  Limpar
                </button>
                <button className="cat__fechar" onClick={() => setGavetaAberta(false)} aria-label="Fechar filtros">
                  <IconClose size={22} />
                </button>
              </div>

              <label className="fb-switch">
                <span>
                  <strong>Abaixo da FIPE</strong>
                  <small>Valor menor que a tabela</small>
                </span>
                <input type="checkbox" checked={f.soAbaixoFipe} onChange={(e) => set('soAbaixoFipe', e.target.checked)} />
                <span className="fb-switch__trilho" aria-hidden />
              </label>

              <Bloco titulo="Câmbio">
                <div className="fb-duplo">
                  {(['Automático', 'Manual'] as const).map((c) => (
                    <button key={c} className={f.cambio === c ? 'is-ativo' : ''} onClick={() => set('cambio', f.cambio === c ? '' : c)}>
                      {c}
                    </button>
                  ))}
                </div>
              </Bloco>

              <Bloco titulo="Marca">
                <ul className="fb-lista">
                  {['', ...marcasExibidas].map((m) => (
                    <li key={m || 'todas'}>
                      <label>
                        <span>{m || 'Todas as marcas'}</span>
                        <input type="radio" name="marca" checked={f.marca === m} onChange={() => set('marca', m)} />
                        <span className="fb-check" aria-hidden />
                      </label>
                    </li>
                  ))}
                </ul>
                {marcas.length > MARCAS_VISIVEIS && (
                  <button className="fb-mais" onClick={() => setTodasMarcas((v) => !v)}>
                    {todasMarcas ? 'Menos marcas' : 'Mais marcas'}
                    <IconChevron size={14} className={todasMarcas ? 'gira-cima' : 'gira-baixo'} />
                  </button>
                )}
              </Bloco>

              <Bloco titulo="Faixa de preço">
                <div className="fb-preco">
                  <div className="fb-preco__barras" aria-hidden>
                    {histograma.map((b) => (
                      <span
                        key={b.ini}
                        className={b.fim > lo && b.ini < hi ? 'is-dentro' : ''}
                        style={{ height: `${(b.total / maiorBarra) * 100}%` }}
                      />
                    ))}
                  </div>
                  <div className="fb-preco__trilho">
                    <span className="fb-preco__faixa" style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }} />
                    <input
                      type="range"
                      min={PRECO_MIN}
                      max={PRECO_MAX}
                      step={PASSO}
                      value={lo}
                      onChange={(e) => mudarMin(Number(e.target.value))}
                      aria-label="Preço mínimo"
                    />
                    <input
                      type="range"
                      min={PRECO_MIN}
                      max={PRECO_MAX}
                      step={PASSO}
                      value={hi}
                      onChange={(e) => mudarMax(Number(e.target.value))}
                      aria-label="Preço máximo"
                    />
                  </div>
                  <div className="fb-preco__valores">
                    <span>{milhar(lo)}</span>
                    <i />
                    <span>{milhar(hi)}</span>
                  </div>
                </div>
              </Bloco>

              <Bloco titulo="Categoria">
                <div className="fb-chips">
                  {categorias.map((c) => (
                    <button key={c} className={f.categorias.includes(c) ? 'is-ativo' : ''} onClick={() => set('categorias', alternar(f.categorias, c))}>
                      {c}
                    </button>
                  ))}
                </div>
              </Bloco>

              <Bloco titulo="Ano a partir de">
                <select className="fb-select" value={f.anoMin} onChange={(e) => set('anoMin', Number(e.target.value))}>
                  <option value={0}>Qualquer ano</option>
                  {anos.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </Bloco>

              <Bloco titulo="Cor">
                <div className="fb-cores">
                  {cores.map((c) => (
                    <label key={c} title={c}>
                      <input type="checkbox" checked={f.cores.includes(c)} onChange={() => set('cores', alternar(f.cores, c))} />
                      <span style={{ background: coresHex[c] ?? '#999' }} />
                      <span className="sr-only">{c}</span>
                    </label>
                  ))}
                </div>
              </Bloco>

              <Bloco titulo="Combustível">
                <ul className="fb-lista">
                  {combustiveis.map((c) => (
                    <li key={c}>
                      <label>
                        <span>{c}</span>
                        <input type="checkbox" checked={f.combustiveis.includes(c)} onChange={() => set('combustiveis', alternar(f.combustiveis, c))} />
                        <span className="fb-check" aria-hidden />
                      </label>
                    </li>
                  ))}
                </ul>
              </Bloco>

              <Bloco titulo="Itens">
                <ul className="fb-lista">
                  {itens.map((i) => (
                    <li key={i}>
                      <label>
                        <span>{i}</span>
                        <input type="checkbox" checked={f.itens.includes(i)} onChange={() => set('itens', alternar(f.itens, i))} />
                        <span className="fb-check" aria-hidden />
                      </label>
                    </li>
                  ))}
                </ul>
              </Bloco>

              <div className="cat__lateral-acoes">
                <button className="btn btn--contorno" onClick={limpar}>
                  Limpar
                </button>
                <button className="btn btn--azul" onClick={() => setGavetaAberta(false)}>
                  Ver {lista.length} {lista.length === 1 ? 'carro' : 'carros'}
                </button>
              </div>
            </aside>

            <section className="cat__resultados">
              <header className="cat__resultados-topo">
                <h1>
                  {lista.length} {lista.length === 1 ? 'carro encontrado' : 'carros encontrados'}
                  <span> em {loja.cidade}/{loja.uf}</span>
                </h1>
                {etiquetas.length > 0 && (
                  <ul className="cat__etiquetas">
                    {etiquetas.map((e) => (
                      <li key={e.rotulo}>
                        {e.rotulo}
                        <button onClick={e.remover} aria-label={`Remover filtro ${e.rotulo}`}>
                          <IconClose size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </header>

              {lista.length > 0 ? (
                <div className="cat__grade">
                  {lista.map((v) => (
                    <CardEstoque key={v.id} veiculo={v} />
                  ))}
                </div>
              ) : (
                <div className="cat__vazio">
                  <p>Nenhum carro com esses filtros.</p>
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

              <p className="cat__nota">Valores sujeitos a confirmação no atendimento.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
