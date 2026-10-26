import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { disponiveis, vendidos, type Categoria } from '../data/veiculos'
import { urlImagem } from '../data/imagens'
import { BuscaRapida } from '../components/BuscaRapida'
import { CardDestaque } from '../components/CardDestaque'
import { Foto } from '../components/Foto'
import {
  IconArrowRight,
  IconCarCheck,
  IconCheckCircle,
  IconHandshake,
  IconInstagram,
  IconKey,
  IconPin,
  IconSearch,
  IconWhatsApp,
} from '../components/Icons'
import { linkInstagram, linkMaps, linkMapsEmbed, linkWhatsApp, loja } from '../config/loja'

const recentes = [...disponiveis].sort((a, b) => b.entrada.localeCompare(a.entrada))

const marcas = Object.entries(
  disponiveis.reduce<Record<string, number>>((acc, v) => ({ ...acc, [v.marca]: (acc[v.marca] ?? 0) + 1 }), {}),
).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))

const categorias = (['SUV', 'Picape', 'Hatch', 'Sedã'] as Categoria[])
  .map((c) => ({ nome: c, lista: disponiveis.filter((v) => v.categoria === c) }))
  .filter((c) => c.lista.length > 0)

const passos = [
  { icone: <IconSearch size={26} />, titulo: 'Escolha o carro', texto: 'Veja o estoque no site ou passe na loja na Folha 27.' },
  { icone: <IconWhatsApp size={24} />, titulo: 'Chame no WhatsApp', texto: 'Tire dúvidas, peça mais fotos e confirme a disponibilidade.' },
  { icone: <IconCarCheck size={26} />, titulo: 'Veja de perto', texto: 'Agende uma visita para conferir o carro antes de fechar.' },
  { icone: <IconKey size={26} />, titulo: 'Feche o negócio', texto: 'Pagamento, entrada e troca combinados direto com a gente.' },
]

export default function Home() {
  useEffect(() => {
    document.title = `${loja.nome} | ${loja.cidade} - ${loja.uf}`
  }, [])

  return (
    <>
      <section className="hero">
        <img className="hero__fundo" src={urlImagem('tcross', 1920)} alt="" />
        <div className="container hero__conteudo">
          <p className="hero__sobre">Repasse de veículos em {loja.cidade} - {loja.uf}</p>
          <h1>
            Procurando um carro?
            <br />
            Ele pode estar no nosso pátio.
          </h1>
          <ul className="hero__lista">
            <li>
              <IconCheckCircle size={20} /> Multimarcas
            </li>
            <li>
              <IconCheckCircle size={20} /> Repasse para lojistas
            </li>
            <li>
              <IconCheckCircle size={20} /> Atendimento direto pelo WhatsApp
            </li>
          </ul>
        </div>
      </section>

      <div className="container busca__wrap">
        <BuscaRapida />
      </div>

      <section className="secao secao--marcas">
        <div className="container">
          <header className="secao__topo">
            <div>
              <h2>Marcas no estoque</h2>
              <p className="secao__sub">Carros de várias montadoras, todos no mesmo pátio.</p>
            </div>
            <Link to="/estoque" className="link-seta">
              Ver todas <IconArrowRight size={16} />
            </Link>
          </header>
          <ul className="marcas">
            {marcas.map(([marca, total]) => (
              <li key={marca}>
                <Link to={`/estoque?marca=${encodeURIComponent(marca)}`} className="marca">
                  <span className="marca__nome">{marca}</span>
                  <span className="marca__total">
                    {total} {total === 1 ? 'carro' : 'carros'}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <header className="secao__topo">
            <div>
              <h2>Chegaram no pátio</h2>
              <p className="secao__sub">Os últimos veículos que entraram no estoque.</p>
            </div>
          </header>
          <div className="grade-destaque">
            {recentes.slice(0, 6).map((v) => (
              <CardDestaque key={v.id} veiculo={v} />
            ))}
          </div>
          <div className="centro">
            <Link to="/estoque" className="btn btn--azul">
              Ver estoque completo <IconArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section id="lojistas" className="secao secao--cinza">
        <div className="container split">
          <div className="split__foto">
            <Foto src={urlImagem('hilux', 1400)} alt="Picape no pátio" />
            <div className="split__cartao">
              <IconHandshake size={28} />
              <span>
                <strong>Repasse para lojistas</strong>
                Unidade ou lote
              </span>
            </div>
          </div>
          <div className="split__texto">
            <p className="sobretitulo">Para lojistas</p>
            <h2>Abasteça sua loja com carros de repasse</h2>
            <p className="split__lead">
              Trabalhamos com repasse para revendedores da região. Peça a lista atualizada e receba fotos e valores
              de cada carro direto no WhatsApp.
            </p>
            <ul className="lista-check">
              <li>
                <IconCheckCircle size={20} /> Lista atualizada, com fotos de cada carro
              </li>
              <li>
                <IconCheckCircle size={20} /> Valor de repasse informado carro a carro
              </li>
              <li>
                <IconCheckCircle size={20} /> Carros multimarcas, de hatch a picape
              </li>
              <li>
                <IconCheckCircle size={20} /> Atendimento direto com o Leonardo
              </li>
            </ul>
            <a
              className="btn btn--whats"
              href={linkWhatsApp('Olá! Sou lojista e quero receber a lista de repasse.')}
              target="_blank"
              rel="noreferrer"
            >
              <IconWhatsApp size={18} /> Receber lista de repasse
            </a>
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <header className="secao__topo">
            <div>
              <h2>Navegue por categoria</h2>
              <p className="secao__sub">Do primeiro carro à picape de trabalho.</p>
            </div>
          </header>
          <div className="categorias">
            {categorias.map((c) => (
              <Link key={c.nome} to={`/estoque?categoria=${encodeURIComponent(c.nome)}`} className="categoria">
                <Foto src={c.lista[0].fotos[0]} alt={c.nome} />
                <span className="categoria__info">
                  <strong>{c.nome}</strong>
                  {c.lista.length} {c.lista.length === 1 ? 'veículo' : 'veículos'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="secao secao--cinza">
        <div className="container">
          <header className="secao__topo secao__topo--centro">
            <p className="sobretitulo">Como funciona</p>
            <h2>Do primeiro contato à chave na mão</h2>
          </header>
          <ol className="passos">
            {passos.map((p, i) => (
              <li key={p.titulo} className="passo">
                <span className="passo__icone">{p.icone}</span>
                <span className="passo__num">Passo {i + 1}</span>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="numeros">
        <div className="container numeros__grid">
          <div>
            <strong>{disponiveis.length}</strong>
            <span>veículos no pátio</span>
          </div>
          <div>
            <strong>{marcas.length}</strong>
            <span>marcas diferentes</span>
          </div>
          <div>
            <strong>18,5 mil</strong>
            <span>seguidores no Instagram</span>
          </div>
          <div>
            <strong>Folha 27</strong>
            <span>em frente ao Mix Mateus</span>
          </div>
        </div>
      </section>

      {vendidos.length > 0 && (
        <section className="secao">
          <div className="container">
            <header className="secao__topo">
              <div>
                <h2>Vendidos recentemente</h2>
                <p className="secao__sub">Não achou o que procura? Avisamos quando chegar um parecido.</p>
              </div>
              <a href={linkInstagram} target="_blank" rel="noreferrer" className="link-seta">
                <IconInstagram size={16} /> Ver entregas no Instagram
              </a>
            </header>
            <div className="grade-destaque">
              {vendidos.slice(0, 3).map((v) => (
                <CardDestaque key={v.id} veiculo={v} vendido />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="localizacao" className="secao secao--cinza">
        <div className="container local">
          <div className="local__info">
            <p className="sobretitulo">Localização</p>
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
            <iframe title={`Mapa: ${loja.nome}`} src={linkMapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>

      <section className="chamada">
        <div className="container chamada__inner">
          <div>
            <h2>Não achou o carro que procura?</h2>
            <p>Diga o modelo, o ano e quanto quer investir. Avisamos quando chegar um assim.</p>
          </div>
          <a
            className="btn btn--branco"
            href={linkWhatsApp('Olá! Estou procurando um carro. Modelo:  Ano:  Valor:')}
            target="_blank"
            rel="noreferrer"
          >
            <IconWhatsApp size={18} /> Avisar pelo WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
