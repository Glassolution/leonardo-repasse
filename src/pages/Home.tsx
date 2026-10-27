import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { disponiveis, type Categoria } from '../data/veiculos'
import { BuscaRapida } from '../components/BuscaRapida'
import { CardVitrine } from '../components/CardVitrine'
import { CardAvaliacao } from '../components/CardAvaliacao'
import { avaliacoes } from '../data/avaliacoes'
import {
  IconArrowRight,
  IconCar,
  IconCarCheck,
  IconChevron,
  IconHandshake,
  IconPin,
  IconTag,
  IconUser,
  IconWhatsApp,
} from '../components/Icons'
import { abaixoFipe, formatarMoeda } from '../lib/format'
import { linkWhatsApp, loja } from '../config/loja'

const recentes = [...disponiveis].sort((a, b) => b.entrada.localeCompare(a.entrada))

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

const equipe = [
  { titulo: 'Vendas', texto: 'Atendimento ao cliente final', icone: <IconUser size={44} /> },
  { titulo: 'Repasse', texto: 'Atendimento a lojistas', icone: <IconHandshake size={44} /> },
  { titulo: 'WhatsApp', texto: 'Fotos, vídeos e dúvidas', icone: <IconWhatsApp size={40} /> },
  { titulo: 'Documentação', texto: 'Transferência e papelada', icone: <IconCarCheck size={44} /> },
]

// Os 3 primeiros vão para a grade de avaliações; o banner usa os seguintes (ou todos, se forem poucos).
const depoimentos = avaliacoes.length > 3 ? avaliacoes.slice(3) : avaliacoes

export default function Home() {
  const trilho = useRef<HTMLDivElement>(null)
  const [procura, setProcura] = useState('')
  const [depo, setDepo] = useState(0)
  const mudarDepo = (passo: number) => setDepo((i) => (i + passo + depoimentos.length) % depoimentos.length)

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
    const nomeLoja = procura.trim()
    window.open(
      linkWhatsApp(`Olá! Sou lojista${nomeLoja ? ` (${nomeLoja})` : ''} e quero receber a lista de repasse.`),
      '_blank',
      'noreferrer',
    )
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

      <section className="lp-secao lp-secao--depois">
        <div className="container">
          {avaliacoes.length > 0 && (
            <>
              <header className="lp-topo lp-topo--centro lp-topo--p">
                <h2>Avaliações de clientes</h2>
                <p>Veja o que falam de nós.</p>
              </header>
              <div className="lp-avaliacoes">
                {avaliacoes.slice(0, 3).map((a, i) => (
                  <CardAvaliacao key={i} avaliacao={a} />
                ))}
              </div>
            </>
          )}

          <header className="lp-topo lp-topo--centro lp-topo--p lp-topo--bloco">
            <h2>Carros em destaque</h2>
            <p>Os últimos que chegaram no pátio.</p>
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
        <section className="lp-secao lp-secao--carrossel">
          <div className="container">
            <header className="lp-topo lp-topo--carrossel">
              <div className="lp-topo lp-topo--centro lp-topo--p">
                <h2>Maiores descontos sobre a FIPE</h2>
                <p>Os carros com a maior diferença para a tabela do mês.</p>
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
                <CardVitrine key={v.id} veiculo={v} comDesconto />
              ))}
            </div>
          </div>
        </section>
      )}

      {depoimentos.length > 0 && (
        <section className="container lp-depo-wrap">
          <div className="lp-depo">
            <div className="lp-depo__luz" aria-hidden />
            <img className="lp-depo__pessoa" src="/cliente.webp" alt="" aria-hidden loading="lazy" />
            <div className="lp-depo__texto">
              <h2>O que dizem nossos clientes</h2>
              <p className="lp-depo__sub">Opiniões de quem já comprou com a gente.</p>
              <figure className="lp-depo__cartao">
                <span className="lp-depo__aspas" aria-hidden>
                  “
                </span>
                <blockquote>{depoimentos[depo].texto}</blockquote>
                <figcaption>
                  <span className="lp-depo__avatar" aria-hidden>
                    <IconUser size={22} />
                  </span>
                  <span>
                    <strong>{depoimentos[depo].nome}</strong>
                    <small>{depoimentos[depo].cidade}</small>
                  </span>
                  <span className="lp-depo__setas">
                    <button onClick={() => mudarDepo(-1)} aria-label="Depoimento anterior">
                      <IconChevron dir="left" size={16} />
                    </button>
                    <button onClick={() => mudarDepo(1)} aria-label="Próximo depoimento">
                      <IconChevron size={16} />
                    </button>
                  </span>
                </figcaption>
              </figure>
              <div className="lp-depo__pontos" aria-hidden>
                {depoimentos.map((_, i) => (
                  <span key={i} className={i === depo ? 'is-ativo' : ''} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="lp-secao lp-secao--equipe">
        <div className="container">
          <header className="lp-topo lp-topo--centro lp-topo--p">
            <h2>Nossa equipe</h2>
            <p>Atendimento dedicado em cada etapa da compra.</p>
          </header>
          <div className="lp-equipe">
            {equipe.map((e) => (
              <div key={e.titulo} className="lp-membro">
                <div className="lp-membro__foto">
                  <span>{e.icone}</span>
                </div>
                <strong>{e.titulo}</strong>
                <small>{e.texto}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="lojistas" className="lp-aviso">
        <div className="container lp-aviso__grid">
          <div className="lp-aviso__texto">
            <h2>É lojista? Receba a lista de repasse</h2>
            <p>Carros com fotos e valores direto no seu WhatsApp.</p>
            <form className="lp-aviso__form" onSubmit={avisar}>
              <input
                value={procura}
                onChange={(e) => setProcura(e.target.value)}
                placeholder="Nome da sua loja"
                aria-label="Nome da sua loja"
              />
              <button type="submit">Receber lista</button>
            </form>
          </div>
          <img className="lp-aviso__carro" src="/categorias/suv.webp" alt="" aria-hidden loading="lazy" />
        </div>
      </section>
    </>
  )
}
