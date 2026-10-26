import { Link } from 'react-router-dom'
import type { Veiculo } from '../data/veiculos'
import { abaixoFipe, formatarAno, formatarPreco } from '../lib/format'
import { Foto } from './Foto'
import { IconCalendar, IconGauge } from './Icons'

// Card do catálogo: foto, selo, nome em caixa alta, ano/km, preço e botão.
export function CardEstoque({ veiculo }: { veiculo: Veiculo }) {
  const url = `/veiculo/${veiculo.id}`
  const reservado = veiculo.status === 'reservado'
  const selo = reservado ? 'Reservado' : abaixoFipe(veiculo) ? 'Abaixo da FIPE' : 'Repasse'

  return (
    <article className="ce">
      <p className="ce__etiqueta">Repasse</p>

      <Link to={url} className="ce__foto" tabIndex={-1} aria-hidden>
        <Foto src={veiculo.fotos[0]} alt={`${veiculo.marca} ${veiculo.modelo} ${veiculo.versao}`} />
        {veiculo.fotos.length > 0 && <span className="ce__contador">1/{veiculo.fotos.length}</span>}
      </Link>

      <div className="ce__corpo">
        <div className="ce__selos">
          <span className={`ce__selo ${reservado ? 'ce__selo--reservado' : ''}`}>{selo}</span>
          <span className="ce__marca" aria-hidden>
            L
          </span>
        </div>

        <h3 className="ce__nome">
          <Link to={url}>
            {veiculo.marca} {veiculo.modelo}
          </Link>
        </h3>
        <p className="ce__versao">
          {veiculo.versao} {veiculo.cambio === 'Manual' ? 'Manual' : 'Automático'}
        </p>

        <ul className="ce__dados">
          <li>
            <IconCalendar size={18} /> {formatarAno(veiculo)}
          </li>
          <li>
            <IconGauge size={18} /> {veiculo.km.toLocaleString('pt-BR')} Km
          </li>
        </ul>

        <p className="ce__preco">{formatarPreco(veiculo.preco)}</p>

        <Link to={url} className="ce__botao">
          Ver oferta
        </Link>
      </div>
    </article>
  )
}
