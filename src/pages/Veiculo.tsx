import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { veiculos } from '../data/veiculos'
import { VeiculoMidia } from '../components/VeiculoMidia'
import { VeiculoCard } from '../components/VeiculoCard'
import { IconArrowLeft, IconChevron, IconShare, IconWhatsApp } from '../components/Icons'
import { formatarAno, formatarKm, formatarPreco, mensagemInteresse, nomeCompleto } from '../lib/format'
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
    if (veiculo) document.title = `${nomeCompleto(veiculo)} ${formatarAno(veiculo) ?? ''} | ${loja.nome}`
  }, [veiculo])

  if (!veiculo) return <NaoEncontrado />

  const vendido = veiculo.status === 'vendido'
  const fotos = veiculo.fotos
  const total = fotos.length

  const ficha: [string, string | undefined][] = [
    ['Marca', veiculo.marca],
    ['Modelo', [veiculo.modelo, veiculo.versao].filter(Boolean).join(' ')],
    ['Ano', formatarAno(veiculo)],
    ['Quilometragem', veiculo.km !== undefined ? formatarKm(veiculo.km) : undefined],
    ['Câmbio', veiculo.cambio],
    ['Combustível', veiculo.combustivel],
    ['Cor', veiculo.cor],
    ['Categoria', veiculo.categoria],
  ]

  const outros = veiculos
    .filter((v) => v.id !== veiculo.id && v.status !== 'vendido')
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
      <div className="container detalhe">
        <Link to="/#estoque" className="voltar">
          <IconArrowLeft size={18} /> Voltar ao estoque
        </Link>

        <div className="detalhe__grid">
          <div className="galeria">
            <div className="galeria__principal">
              <VeiculoMidia
                veiculo={veiculo}
                foto={fotos[fotoAtual]}
                tamanhoFaixa="g"
                comFaixa={total === 0}
                carregamento="eager"
              />
              {vendido && <span className="vendido__carimbo vendido__carimbo--g">Vendido</span>}
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
                  <button
                    key={f}
                    className={i === fotoAtual ? 'is-ativa' : ''}
                    onClick={() => setFotoAtual(i)}
                    aria-label={`Ver foto ${i + 1}`}
                  >
                    <img src={f} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <aside className="painel">
            <p className="painel__marca">{veiculo.marca}</p>
            <h1 className="painel__nome">
              {[veiculo.modelo, veiculo.versao].filter(Boolean).join(' ')}
              {formatarAno(veiculo) && <span> {formatarAno(veiculo)}</span>}
            </h1>

            {vendido ? (
              <div className="painel__aviso">
                Este veículo já foi vendido. Fale com a gente para saber de um parecido.
              </div>
            ) : (
              <p className={`painel__preco ${veiculo.preco ? '' : 'painel__preco--consulta'}`}>
                {formatarPreco(veiculo.preco)}
              </p>
            )}

            <div className="painel__acoes">
              <a
                className="btn btn--whats btn--largo"
                href={linkWhatsApp(
                  vendido
                    ? `Olá! Vi que o ${nomeCompleto(veiculo)} foi vendido. Têm algum parecido?`
                    : mensagemInteresse(veiculo),
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
              {ficha
                .filter(([, valor]) => valor)
                .map(([rotulo, valor]) => (
                  <div key={rotulo}>
                    <dt>{rotulo}</dt>
                    <dd>{valor}</dd>
                  </div>
                ))}
            </dl>

            {veiculo.observacoes && (
              <div className="painel__obs">
                <h2>Observações</h2>
                <p>{veiculo.observacoes}</p>
              </div>
            )}
          </aside>
        </div>
      </div>

      {outros.length > 0 && (
        <section className="secao secao--cinza">
          <div className="container">
            <header className="secao__topo">
              <h2>Veja também</h2>
              <Link to="/#estoque" className="link-seta">
                Estoque completo
              </Link>
            </header>
            <div className="grade">
              {outros.map((v) => (
                <VeiculoCard key={v.id} veiculo={v} />
              ))}
            </div>
          </div>
        </section>
      )}

      {!vendido && (
        <div className="barra-mobile">
          <span>
            <small>{nomeCompleto(veiculo)}</small>
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
