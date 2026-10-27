import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { disponiveis, vendidos, type Categoria } from '../data/veiculos'
import { urlImagem } from '../data/imagens'
import { BuscaRapida } from '../components/BuscaRapida'
import { CardVitrine } from '../components/CardVitrine'
import { Foto } from '../components/Foto'
import {
  IconArrowRight,
  IconCar,
  IconCarCheck,
  IconCheckCircle,
  IconChevron,
  IconHandshake,
  IconPin,
  IconTag,
  IconWhatsApp,
} from '../components/Icons'
import { abaixoFipe, formatarAno, formatarMoeda } from '../lib/format'
import { linkWhatsApp, loja } from '../config/loja'

const recentes = [...disponiveis].sort((a, b) => b.entrada.localeCompare(a.entrada))

const marcas = [...new Set(disponiveis.map((v) => v.marca))].sort()

// Imagens recortadas (sem fundo) em /public/categorias, só para ilustrar cada tipo.
const categorias = (
  [
    ['SUV', 'suv'],
    ['Sedã', 'seda'],
    ['Hatch', 'hatch'],
    ['Picape', 'picape'],
  ] as [Categoria, string][]
).map(([nome, arquivo]) => ({
  nome,
  imagem: `/categorias/${arquivo}.webp`,
  total: disponiveis.filter((v) => v.categoria === nome).length,
}))

const comDesconto = disponiveis
  .filter((v) => v.status === 'disponivel' && abaixoFipe(v))
  .sort((a, b) => (abaixoFipe(b) ?? 0) - (abaixoFipe(a) ?? 0))

const oferta = comDesconto[0]

const destaques = [
  { icone: <IconCar size={22} />, titulo: `${disponiveis.length} carros no pátio`, texto: 'Multimarcas, de hatch a picape' },
  { icone: <IconTag size={22} />, titulo: 'Preço de repasse', texto: 'Valor informado carro a carro' },
  { icone: <IconWhatsApp size={21} />, titulo: 'Atendimento direto', texto: 'Fale com a loja pelo WhatsApp' },
  { icone: <IconPin size={22} />, titulo: 'Folha 27', texto: 'Em frente ao Mix Mateus' },
]

const motivos = [
  { icone: <IconHandshake size={22} />, titulo: 'Repasse para lojistas', texto: 'Unidade ou lote, com lista atualizada.' },
  { icone: <IconCar size={22} />, titulo: 'Multimarcas', texto: `${marcas.slice(0, 4).join(', ')} e mais.` },
  { icone: <IconCarCheck size={22} />, titulo: 'Veja antes de fechar', texto: 'Agende uma visita para conferir.' },
  { icone: <IconTag size={22} />, titulo: 'Comparado com a FIPE', texto: 'Diferença mostrada em cada anúncio.' },
]

export default function Home() {
  const trilho = useRef<HTMLDivElement>(null)
  const [procura, setProcura] = useState('')

  useEffect(() => {
    document.title = `${loja.nome} | ${loja.cidade} - ${loja.uf}`
  }, [])

  const rolar = (direcao: 1 | -1) => {
    const el = trilho.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('.cv')
    el.scrollBy({ left: direcao * ((card?.offsetWidth ?? 300) + 20), behavior: 'smooth' })
  }

  const avisar = (e: FormEvent) => {
    e.preventDefault()
    const texto = procura.trim() || 'um carro'
    window.open(linkWhatsApp(`Olá! Estou procurando ${texto}. Me avisem quando chegar?`), '_blank', 'noreferrer')
  }

  return (
    <>
      <section className="lp-hero">
        <div className="lp-hero__palco">
          <div className="lp-hero__texto">
            <h1>
              Seminovos multimarcas em {loja.cidade}
              <br />
              <span>Valor de repasse</span>, sem enrolação.
            </h1>
            <p>
              Veja o estoque, compare com a tabela FIPE
              <br />e feche direto com a loja pelo WhatsApp.
            </p>
          </div>
          <div className="lp-hero__busca">
            <BuscaRapida />
          </div>
          <div className="lp-hero__cena" role="img" aria-label="SUV às margens de um lago com montanhas ao fundo" />
        </div>
      </section>

      <section className="lp-faixa-wrap">
        <div className="container lp-faixa">
          {destaques.map((d) => (
            <div key={d.titulo} className="lp-faixa__item">
              <span className="lp-icone lp-icone--suave">{d.icone}</span>
              <span>
                <strong>{d.titulo}</strong>
                {d.texto}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="lp-secao lp-secao--tipos">
        <div className="container">
          <header className="lp-topo lp-topo--tipos">
            <h2>Navegue por categoria</h2>
            <Link to="/estoque" className="lp-pilula lp-pilula--azul">
              Ver todos os carros
            </Link>
          </header>
          <div className="lp-tipos">
            {categorias.map((c) => (
              <Link key={c.nome} to={`/estoque?categoria=${encodeURIComponent(c.nome)}`} className="lp-tipo">
                <div className="lp-tipo__foto">
                  <img src={c.imagem} alt={c.nome} loading="lazy" />
                </div>
                <div className="lp-tipo__info">
                  <strong>{c.nome}</strong>
                  <span>{c.total > 0 ? `${c.total} ${c.total === 1 ? 'carro' : 'carros'}` : 'Sob consulta'}</span>
                </div>
              </Link>
            ))}
          </div>

          {oferta && (
            <div className="lp-oferta">
              <span className="lp-oferta__aneis" aria-hidden />
              <span className="lp-oferta__piso" aria-hidden />
              <div className="lp-oferta__texto">
                <span className="lp-oferta__rotulo">Oferta especial</span>
                <h2>Até {formatarMoeda(abaixoFipe(oferta) ?? 0)} abaixo</h2>
                <p className="lp-oferta__sub">da tabela FIPE em carros do estoque</p>
                <Link to="/estoque?fipe=1" className="lp-oferta__botao">
                  Ver ofertas
                </Link>
              </div>
              <img className="lp-oferta__carro" src="/categorias/seda.webp" alt="Sedã branco" loading="lazy" />
            </div>
          )}
        </div>
      </section>

      <section className="lp-secao">
        <div className="container">
          <header className="lp-topo lp-topo--centro">
            <h2>Por que comprar com a Leonardo?</h2>
            <p>Repasse de veículos simples e direto.</p>
          </header>
          <div className="lp-motivos">
            {motivos.map((m) => (
              <div key={m.titulo} className="lp-motivo">
                <span className="lp-icone lp-icone--suave">{m.icone}</span>
                <span>
                  <strong>{m.titulo}</strong>
                  {m.texto}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-secao lp-secao--cinza">
        <div className="container">
          <header className="lp-topo lp-topo--centro">
            <h2>Chegaram no pátio</h2>
            <p>Os últimos carros que entraram no estoque.</p>
          </header>
          <div className="lp-grade">
            {recentes.slice(0, 4).map((v) => (
              <CardVitrine key={v.id} veiculo={v} />
            ))}
          </div>
          <div className="lp-centro">
            <Link to="/estoque" className="lp-botao">
              Ver estoque completo <IconArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {comDesconto.length > 1 && (
        <section className="lp-secao">
          <div className="container">
            <header className="lp-topo">
              <div>
                <h2>Maiores descontos sobre a FIPE</h2>
                <p>Carros com a maior diferença para a tabela do mês.</p>
              </div>
              <div className="lp-setas">
                <button onClick={() => rolar(-1)} aria-label="Anteriores">
                  <IconChevron dir="left" size={18} />
                </button>
                <button onClick={() => rolar(1)} aria-label="Próximos">
                  <IconChevron size={18} />
                </button>
              </div>
            </header>
            <div className="lp-trilho" ref={trilho}>
              {comDesconto.map((v) => (
                <CardVitrine key={v.id} veiculo={v} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="lojistas" className="lp-lojistas">
        <div className="container lp-lojistas__grid">
          <div className="lp-lojistas__texto">
            <h2>Para lojistas</h2>
            <p className="lp-lojistas__sub">Repasse de veículos para revendas da região.</p>
            <p className="lp-lojistas__lead">
              Peça a lista atualizada e receba fotos e valores de cada carro direto no WhatsApp. Atendimento com o
              próprio Leonardo.
            </p>
            <ul>
              <li>
                <IconCheckCircle size={18} /> Unidade ou lote
              </li>
              <li>
                <IconCheckCircle size={18} /> Fotos de cada carro
              </li>
              <li>
                <IconCheckCircle size={18} /> Valor de repasse informado
              </li>
            </ul>
            <a
              className="lp-botao lp-botao--branco"
              href={linkWhatsApp('Olá! Sou lojista e quero receber a lista de repasse.')}
              target="_blank"
              rel="noreferrer"
            >
              <IconWhatsApp size={18} /> Receber lista de repasse
            </a>
          </div>
          <div className="lp-lojistas__foto">
            <Foto src={urlImagem('hilux', 1400)} alt="Picape do estoque" />
          </div>
        </div>
      </section>

      {vendidos.length > 0 && (
        <section className="lp-secao">
          <div className="container">
            <header className="lp-topo lp-topo--centro">
              <h2>Vendidos recentemente</h2>
              <p>Alguns dos carros que já saíram do nosso pátio.</p>
            </header>
            <div className="lp-vendidos">
              {vendidos.slice(0, 4).map((v) => (
                <div key={v.id} className="lp-vendido">
                  <div className="lp-vendido__foto">
                    <Foto src={v.fotos[0]} alt={`${v.marca} ${v.modelo}`} />
                    <span>Vendido</span>
                  </div>
                  <strong>
                    {v.marca} {v.modelo}
                  </strong>
                  <small>{formatarAno(v)}</small>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="lp-secao lp-secao--marcas">
        <div className="container">
          <header className="lp-topo lp-topo--centro">
            <h2>Marcas no estoque</h2>
            <p>Clique para ver os carros de cada marca.</p>
          </header>
          <ul className="lp-marcas">
            {marcas.map((m) => (
              <li key={m}>
                <Link to={`/estoque?marca=${encodeURIComponent(m)}`}>{m}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="lp-aviso">
        <div className="container lp-aviso__grid">
          <div>
            <h2>Não achou o carro que procura?</h2>
            <p>Diga o modelo e avisamos pelo WhatsApp quando chegar um assim.</p>
            <form className="lp-aviso__form" onSubmit={avisar}>
              <input
                value={procura}
                onChange={(e) => setProcura(e.target.value)}
                placeholder="Ex.: Hilux 2020 até R$ 200 mil"
                aria-label="Carro que você procura"
              />
              <button type="submit">Avisar</button>
            </form>
          </div>
          <div className="lp-aviso__foto">
            <Foto src={urlImagem('corollaCross', 1200)} alt="SUV do estoque" />
          </div>
        </div>
      </section>
    </>
  )
}
