import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { disponiveis, veiculos } from '../data/veiculos'
import { Foto } from '../components/Foto'
import { CardDestaque } from '../components/CardDestaque'
import { IconArrowLeft, IconCheck, IconChevron, IconInfo, IconShare, IconWhatsApp } from '../components/Icons'
import { abaixoFipe, formatarAno, formatarKm, formatarMoeda, formatarPreco, kmCurto, mensagemInteresse, nomeCompleto } from '../lib/format'
import { linkWhatsApp, loja } from '../config/loja'
import NaoEncontrado from './NaoEncontrado'

export default function Veiculo() {
  const { id } = useParams()
  // key reinicia galeria e estados ao trocar de veículo
  return <PaginaVeiculo key={id} id={id} />
}

function PaginaVeiculo({ id }: { id?: string }) {
  const veiculo = veiculos.find((v) => v.id === id)
  const [fotoAtual, setFotoAtual] = useState(0)
  const [copiado, setCopiado] = useState(false)

  useEffect(() => {
    if (veiculo) document.title = `${nomeCompleto(veiculo)} ${formatarAno(veiculo)} | ${loja.nome}`
  }, [veiculo])

  if (!veiculo) return <NaoEncontrado />

  const vendido = veiculo.status === 'vendido'
  const fotos = veiculo.fotos
  const total = fotos.length
  const diferenca = abaixoFipe(veiculo)

  const ficha: [string, string][] = [
    ['Marca', veiculo.marca],
    ['Modelo', `${veiculo.modelo} ${veiculo.versao}`],
    ['Ano', formatarAno(veiculo)],
    ['Quilometragem', formatarKm(veiculo.km)],
    ['Motor', veiculo.motor],
    ['Câmbio', veiculo.cambio],
    ['Combustível', veiculo.combustivel],
    ['Cor', veiculo.cor],
    ['Categoria', veiculo.categoria],
  ]

  const outros = disponiveis
    .filter((v) => v.id !== veiculo.id)
    .sort((a, b) => Number(b.categoria === veiculo.categoria) - Number(a.categoria === veiculo.categoria))
    .slice(0, 3)

  const compartilhar = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: nomeCompleto(veiculo), url })
      } catch {
        // compartilhamento cancelado
      }
      return
    }
    await navigator.clipboard.writeText(url)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  const mudarFoto = (passo: number) => setFotoAtual((i) => (i + passo + total) % total)

  return (
    <>
      <div className="detalhe">
        <div className="container">
          <Link to="/estoque" className="voltar">
            <IconArrowLeft size={18} /> Voltar ao estoque
          </Link>

          <div className="detalhe__grid">
            <div className="galeria">
              <div className="galeria__principal">
                <Foto src={fotos[fotoAtual]} alt={nomeCompleto(veiculo)} carregamento="eager" />
                {vendido && <span className="cd__selo cd__selo--vendido galeria__selo">Vendido</span>}
                {total > 1 && (
                  <>
                    <button className="galeria__seta galeria__seta--esq" onClick={() => mudarFoto(-1)} aria-label="Foto anterior">
                      <IconChevron dir="left" size={22} />
                    </button>
                    <button className="galeria__seta galeria__seta--dir" onClick={() => mudarFoto(1)} aria-label="Próxima foto">
                      <IconChevron size={22} />
                    </button>
                    <span className="galeria__contador">
                      {fotoAtual + 1} / {total}
                    </span>
                  </>
                )}
              </div>
              {total > 1 && (
                <div className="galeria__miniaturas">
                  {fotos.map((f, i) => (
                    <button key={f} className={i === fotoAtual ? 'is-ativa' : ''} onClick={() => setFotoAtual(i)} aria-label={`Ver foto ${i + 1}`}>
                      <img src={f} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}

              <dl className="ce__numeros detalhe__numeros">
                <div>
                  <dd>
                    {kmCurto(veiculo.km)}
                    <small>km</small>
                  </dd>
                  <dt>Quilometragem</dt>
                </div>
                <div>
                  <dd>{formatarAno(veiculo)}</dd>
                  <dt>Ano</dt>
                </div>
                <div>
                  <dd>{veiculo.motor.split(' ')[0]}</dd>
                  <dt>Motor</dt>
                </div>
              </dl>
            </div>

            <aside className="painel">
              <p className="painel__marca">{veiculo.marca}</p>
              <h1 className="painel__nome">{veiculo.modelo}</h1>
              <p className="painel__versao">
                {veiculo.versao} · {formatarAno(veiculo)}
              </p>

              {vendido ? (
                <div className="painel__aviso">Este veículo já foi vendido. Fale com a gente para saber de um parecido.</div>
              ) : (
                <>
                  <p className="painel__preco">
                    {formatarPreco(veiculo.preco)}
                    {veiculo.precoAnterior && <s>{formatarMoeda(veiculo.precoAnterior)}</s>}
                  </p>
                  {veiculo.fipe && <p className="ce__fipe">Tabela FIPE {formatarMoeda(veiculo.fipe)}</p>}
                  {diferenca && (
                    <p className="ce__pilula painel__pilula">
                      {formatarMoeda(diferenca)} abaixo da FIPE <IconInfo size={14} />
                    </p>
                  )}
                </>
              )}

              <div className="painel__acoes">
                <a
                  className="btn btn--whats btn--largo"
                  href={linkWhatsApp(
                    vendido ? `Olá! Vi que o ${nomeCompleto(veiculo)} foi vendido. Têm algum parecido?` : mensagemInteresse(veiculo),
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconWhatsApp size={20} />
                  {vendido ? 'Procurar um parecido' : 'Tenho interesse'}
                </a>
                <button className="btn btn--contorno btn--icone" onClick={compartilhar} aria-label="Compartilhar">
                  <IconShare size={20} />
                </button>
              </div>
              {copiado && <p className="painel__copiado">Link copiado</p>}

              <dl className="ficha">
                {ficha.map(([rotulo, valor]) => (
                  <div key={rotulo}>
                    <dt>{rotulo}</dt>
                    <dd>{valor}</dd>
                  </div>
                ))}
              </dl>

              {veiculo.itens.length > 0 && (
                <div className="painel__bloco">
                  <h2>Itens</h2>
                  <ul className="ce__itens">
                    {veiculo.itens.map((i) => (
                      <li key={i}>
                        <IconCheck size={14} /> {i}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {veiculo.observacoes && (
                <div className="painel__bloco">
                  <h2>Observações</h2>
                  <p>{veiculo.observacoes}</p>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>

      {outros.length > 0 && (
        <section className="secao">
          <div className="container">
            <header className="secao__topo">
              <h2>Veja também</h2>
              <Link to="/estoque" className="link-seta">
                Estoque completo
              </Link>
            </header>
            <div className="grade-destaque">
              {outros.map((v) => (
                <CardDestaque key={v.id} veiculo={v} />
              ))}
            </div>
          </div>
        </section>
      )}

      {!vendido && (
        <div className="barra-mobile">
          <span>
            <small>
              {veiculo.marca} {veiculo.modelo}
            </small>
            <strong>{formatarPreco(veiculo.preco)}</strong>
          </span>
          <a className="btn btn--whats" href={linkWhatsApp(mensagemInteresse(veiculo))} target="_blank" rel="noreferrer">
            <IconWhatsApp size={18} /> WhatsApp
          </a>
        </div>
      )}
    </>
  )
}
