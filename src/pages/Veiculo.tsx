import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { disponiveis, veiculos } from '../data/veiculos'
import { Foto } from '../components/Foto'
import { CardDestaque } from '../components/CardDestaque'
import {
  IconArrowLeft,
  IconCalendar,
  IconCheck,
  IconChevron,
  IconClock,
  IconExpand,
  IconGauge,
  IconPin,
  IconShare,
  IconUser,
  IconWallet,
  IconWhatsApp,
} from '../components/Icons'
import { abaixoFipe, formatarAno, formatarKm, formatarMoeda, formatarPreco, nomeCompleto } from '../lib/format'
import { linkMaps, linkMapsEmbed, linkWhatsApp, loja } from '../config/loja'
import NaoEncontrado from './NaoEncontrado'

const pagamentos = ['À vista', 'Financiamento', 'Troca com volta', 'Ainda não sei']
const horarios = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00']

const dataBR = (iso: string) => iso.split('-').reverse().join('/')
const hoje = new Date().toISOString().slice(0, 10)

export default function Veiculo() {
  const { id } = useParams()
  // key reinicia galeria e formulário ao trocar de veículo
  return <PaginaVeiculo key={id} id={id} />
}

function PaginaVeiculo({ id }: { id?: string }) {
  const veiculo = veiculos.find((v) => v.id === id)
  const [fotoAtual, setFotoAtual] = useState(0)
  const [copiado, setCopiado] = useState(false)
  const [nome, setNome] = useState('')
  const [pagamento, setPagamento] = useState(pagamentos[0])
  const [dia, setDia] = useState('')
  const [horario, setHorario] = useState('')

  useEffect(() => {
    if (veiculo) document.title = `${nomeCompleto(veiculo)} ${formatarAno(veiculo)} | ${loja.nome}`
  }, [veiculo])

  if (!veiculo) return <NaoEncontrado />

  const vendido = veiculo.status === 'vendido'
  const fotos = veiculo.fotos
  const total = fotos.length
  const diferenca = abaixoFipe(veiculo)
  const titulo = `${veiculo.marca} ${veiculo.modelo} ${veiculo.anoModelo}`

  const grupos: { titulo: string; itens: string[] }[] = [
    {
      titulo: 'Mecânica',
      itens: [`Motor ${veiculo.motor}`, `Câmbio ${veiculo.cambio === 'CVT' ? 'CVT' : veiculo.cambio.toLowerCase()}`, `Combustível ${veiculo.combustivel.toLowerCase()}`],
    },
    {
      titulo: 'Ficha',
      itens: [`Ano ${formatarAno(veiculo)}`, formatarKm(veiculo.km), `Cor ${veiculo.cor.toLowerCase()}`, veiculo.categoria],
    },
    { titulo: 'Itens', itens: veiculo.itens },
  ].filter((g) => g.itens.length > 0)

  const mensagem = vendido
    ? `Olá! Vi que o ${nomeCompleto(veiculo)} foi vendido. Têm algum parecido?`
    : [
        `Olá! ${nome ? `Sou ${nome.trim()} e tenho` : 'Tenho'} interesse no ${nomeCompleto(veiculo)} ${formatarAno(veiculo)}.`,
        `Pagamento: ${pagamento}.`,
        dia ? `Quero ver o carro dia ${dataBR(dia)}${horario ? ` às ${horario}` : ''}.` : '',
        'Ainda está disponível?',
      ]
        .filter(Boolean)
        .join('\n')

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
      <div className="vp">
        <div className="container">
          <Link to="/estoque" className="vp__voltar">
            <IconArrowLeft size={18} /> Estoque
          </Link>

          <div className="vp__grid">
            <div className="vp__principal">
              <div className="vp__cabecalho">
                <div>
                  <h1 className="vp__titulo">
                    {titulo} <span>– {veiculo.cambio === 'Manual' ? 'Manual' : 'Auto'}</span>
                  </h1>
                  <p className="vp__versao">{veiculo.versao}</p>
                </div>
                <div className="vp__icones">
                  <button className="vp__icone" onClick={compartilhar} aria-label="Compartilhar">
                    <IconShare size={20} />
                  </button>
                  <a className="vp__icone" href={linkWhatsApp(mensagem)} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                    <IconWhatsApp size={20} />
                  </a>
                </div>
              </div>
              {copiado && <p className="vp__copiado">Link copiado</p>}

              <p className="vp__preco">
                {vendido ? 'Vendido' : formatarPreco(veiculo.preco)}
                {!vendido && veiculo.preco && <span>/à vista</span>}
              </p>

              <ul className="vp__pilulas">
                <li>
                  <IconGauge size={18} /> {formatarKm(veiculo.km)}
                </li>
                <li>
                  <IconCalendar size={18} /> {formatarAno(veiculo)}
                </li>
                <li>
                  <IconPin size={18} /> {loja.cidade} - {loja.uf}
                </li>
              </ul>

              <div className="vp__foto">
                <Foto src={fotos[fotoAtual]} alt={nomeCompleto(veiculo)} carregamento="eager" />
                {total > 1 && (
                  <>
                    <button className="vp__seta vp__seta--esq" onClick={() => mudarFoto(-1)} aria-label="Foto anterior">
                      <IconChevron dir="left" size={22} />
                    </button>
                    <button className="vp__seta vp__seta--dir" onClick={() => mudarFoto(1)} aria-label="Próxima foto">
                      <IconChevron size={22} />
                    </button>
                    <span className="vp__contador">
                      {fotoAtual + 1} / {total}
                    </span>
                  </>
                )}
              </div>
              {total > 1 && (
                <div className="vp__miniaturas">
                  {fotos.map((f, i) => (
                    <button key={f} className={i === fotoAtual ? 'is-ativa' : ''} onClick={() => setFotoAtual(i)} aria-label={`Ver foto ${i + 1}`}>
                      <img src={f} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}

              <section className="vp__cartao vp__recursos">
                <h2>Características</h2>
                <div className="vp__grupos">
                  {grupos.map((g) => (
                    <div key={g.titulo}>
                      <h3>{g.titulo}</h3>
                      <ul>
                        {g.itens.map((i) => (
                          <li key={i}>{i}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {veiculo.observacoes && <p className="vp__obs">{veiculo.observacoes}</p>}
              </section>
            </div>

            <aside className="vp__lateral">
              {!vendido && (
                <section className="vp__cartao">
                  <h2>Agende sua visita</h2>
                  <div className="vp__form">
                    <label>
                      <span>
                        <IconUser size={18} /> Seu nome
                      </span>
                      <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Como podemos te chamar?" />
                    </label>
                    <label>
                      <span>
                        <IconWallet size={18} /> Pagamento
                      </span>
                      <select value={pagamento} onChange={(e) => setPagamento(e.target.value)}>
                        {pagamentos.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      <span>
                        <IconCalendar size={18} /> Dia
                      </span>
                      <input type="date" min={hoje} value={dia} onChange={(e) => setDia(e.target.value)} />
                    </label>
                    <label>
                      <span>
                        <IconClock size={18} /> Horário
                      </span>
                      <select value={horario} onChange={(e) => setHorario(e.target.value)}>
                        <option value="">Qualquer horário</option>
                        {horarios.map((h) => (
                          <option key={h}>{h}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                </section>
              )}

              <section className="vp__cartao">
                <h2>Valores</h2>
                {vendido ? (
                  <p className="vp__aviso">Este carro já foi vendido. Fale com a gente para saber de um parecido.</p>
                ) : (
                  <dl className="vp__valores">
                    {veiculo.precoAnterior && (
                      <div>
                        <dt>Preço anterior</dt>
                        <dd>
                          <s>{formatarMoeda(veiculo.precoAnterior)}</s>
                        </dd>
                      </div>
                    )}
                    {veiculo.fipe && (
                      <div>
                        <dt>Tabela FIPE</dt>
                        <dd>{formatarMoeda(veiculo.fipe)}</dd>
                      </div>
                    )}
                    {diferenca && (
                      <div>
                        <dt>Abaixo da FIPE</dt>
                        <dd className="vp__economia">− {formatarMoeda(diferenca)}</dd>
                      </div>
                    )}
                    <div className="vp__total">
                      <dt>Valor do repasse</dt>
                      <dd>{formatarPreco(veiculo.preco)}</dd>
                    </div>
                  </dl>
                )}
                <a className="vp__botao" href={linkWhatsApp(mensagem)} target="_blank" rel="noreferrer">
                  <IconWhatsApp size={20} />
                  {vendido ? 'Procurar um parecido' : 'Tenho interesse'}
                </a>
                {!vendido && (
                  <p className="vp__nota">
                    <IconCheck size={14} /> A mensagem já vai com o carro e os dados acima.
                  </p>
                )}
              </section>

              <section className="vp__cartao">
                <div className="vp__cartao-topo">
                  <h2>Localização</h2>
                  <a className="vp__icone vp__icone--p" href={linkMaps} target="_blank" rel="noreferrer" aria-label="Abrir no Google Maps">
                    <IconExpand size={18} />
                  </a>
                </div>
                <p className="vp__endereco">
                  {loja.endereco}, {loja.bairro}
                </p>
                <div className="vp__mapa">
                  <iframe title={`Mapa: ${loja.nome}`} src={linkMapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
              </section>
            </aside>
          </div>
        </div>
      </div>

      {disponiveis.length > 1 && (
        <section className="secao">
          <div className="container">
            <header className="secao__topo">
              <h2>Veja também</h2>
              <Link to="/estoque" className="link-seta">
                Estoque completo
              </Link>
            </header>
            <div className="grade-destaque">
              {disponiveis
                .filter((v) => v.id !== veiculo.id)
                .sort((a, b) => Number(b.categoria === veiculo.categoria) - Number(a.categoria === veiculo.categoria))
                .slice(0, 3)
                .map((v) => (
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
          <a className="btn btn--whats" href={linkWhatsApp(mensagem)} target="_blank" rel="noreferrer">
            <IconWhatsApp size={18} /> WhatsApp
          </a>
        </div>
      )}
    </>
  )
}
