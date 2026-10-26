import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { veiculos } from '../data/veiculos'
import { Catalogo } from '../components/Catalogo'
import { Destaques } from '../components/Destaques'
import { Vendidos } from '../components/Vendidos'
import { VeiculoMidia } from '../components/VeiculoMidia'
import { IconArrowRight, IconPin, IconWhatsApp } from '../components/Icons'
import { formatarAno, formatarPreco, nomeCompleto } from '../lib/format'
import { linkMaps, linkMapsEmbed, linkWhatsApp, loja } from '../config/loja'

const disponiveis = veiculos.filter((v) => v.status !== 'vendido')
const vendidos = veiculos
  .filter((v) => v.status === 'vendido')
  .sort((a, b) => b.entrada.localeCompare(a.entrada))
const ultimaChegada = [...disponiveis].sort((a, b) => b.entrada.localeCompare(a.entrada))[0]

const condicoes = [
  {
    titulo: 'Repasse para lojistas',
    texto: 'Unidade ou lote, com valor de repasse. Peça a lista atualizada pelo WhatsApp e receba as fotos de cada carro.',
  },
  {
    titulo: 'Venda para cliente final',
    texto: 'Atendimento direto na loja ou pelo WhatsApp. Agende uma visita para ver o carro de perto antes de fechar.',
  },
  {
    titulo: 'Pagamento e troca',
    texto: 'Forma de pagamento, entrada e avaliação do seu usado são combinadas no atendimento, carro a carro.',
  },
]

export default function Home() {
  useEffect(() => {
    document.title = `${loja.nome} | ${loja.cidade} - ${loja.uf}`
  }, [])

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__texto">
            <p className="sobretitulo">
              <span className="ponto" /> Repasse de veículos · {loja.cidade} - {loja.uf}
            </p>
            <h1>
              Multimarcas e repasse para lojistas, <span>no pátio da Folha 27.</span>
            </h1>
            <p className="hero__lead">
              Confira o que está disponível hoje e fale direto com a gente pelo WhatsApp. O estoque muda toda
              semana.
            </p>
            <div className="hero__acoes">
              <Link to="/#estoque" className="btn btn--branco">
                Ver estoque <IconArrowRight size={18} />
              </Link>
              <a className="btn btn--whats" href={linkWhatsApp()} target="_blank" rel="noreferrer">
                <IconWhatsApp size={18} /> {loja.telefoneExibicao}
              </a>
            </div>
            <dl className="hero__numeros">
              <div>
                <dt>No pátio</dt>
                <dd>{disponiveis.length}</dd>
              </div>
              <div>
                <dt>Marcas</dt>
                <dd>{new Set(disponiveis.map((v) => v.marca)).size}</dd>
              </div>
              <div>
                <dt>Endereço</dt>
                <dd className="hero__endereco">Folha 27</dd>
              </div>
            </dl>
          </div>

          {ultimaChegada && (
            <Link to={`/veiculo/${ultimaChegada.id}`} className="hero__destaque">
              <span className="hero__etiqueta">Chegou agora</span>
              <VeiculoMidia veiculo={ultimaChegada} tamanhoFaixa="g" carregamento="eager" />
              <span className="hero__destaque-info">
                <span>
                  {nomeCompleto(ultimaChegada)} {formatarAno(ultimaChegada)}
                </span>
                <strong>{formatarPreco(ultimaChegada.preco)}</strong>
              </span>
            </Link>
          )}
        </div>
      </section>

      <div className="container">
        <Destaques />
      </div>

      <section id="estoque" className="secao">
        <div className="container">
          <header className="secao__topo">
            <div>
              <p className="sobretitulo sobretitulo--escuro">Estoque</p>
              <h2>Disponíveis agora</h2>
            </div>
            <p className="secao__nota">
              Preço e disponibilidade confirmados no atendimento. Lojista, peça a lista completa.
            </p>
          </header>
          <Catalogo veiculos={disponiveis} />
        </div>
      </section>

      {vendidos.length > 0 && (
        <section id="vendidos" className="secao secao--azul">
          <div className="container">
            <header className="secao__topo">
              <div>
                <p className="sobretitulo">Vendidos</p>
                <h2>Entregues recentemente</h2>
              </div>
              <p className="secao__nota">
                Não achou o modelo que queria? Ele pode chegar na próxima leva.
              </p>
            </header>
            <Vendidos veiculos={vendidos} />
          </div>
        </section>
      )}

      <section id="condicoes" className="secao">
        <div className="container">
          <header className="secao__topo">
            <div>
              <p className="sobretitulo sobretitulo--escuro">Condições</p>
              <h2>Como funciona</h2>
            </div>
          </header>
          <ol className="condicoes">
            {condicoes.map((c, i) => (
              <li key={c.titulo} className="condicao">
                <span className="condicao__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{c.titulo}</h3>
                <p>{c.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="localizacao" className="secao secao--cinza">
        <div className="container local">
          <div className="local__info">
            <p className="sobretitulo sobretitulo--escuro">Localização</p>
            <h2>Venha ver de perto</h2>
            <address>
              <IconPin size={22} />
              <span>
                <strong>{loja.endereco}</strong>
                {loja.bairro}, {loja.cidade} - {loja.uf}
              </span>
            </address>
            <div className="local__acoes">
              <a className="btn btn--azul" href={linkMaps} target="_blank" rel="noreferrer">
                Como chegar <IconArrowRight size={18} />
              </a>
              <a
                className="btn btn--contorno"
                href={linkWhatsApp('Olá! Quero agendar uma visita na loja.')}
                target="_blank"
                rel="noreferrer"
              >
                Agendar visita
              </a>
            </div>
          </div>
          <div className="local__mapa">
            <iframe
              title={`Mapa: ${loja.nome}`}
              src={linkMapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  )
}
