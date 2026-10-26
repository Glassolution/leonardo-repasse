import { Link } from 'react-router-dom'
import type { Veiculo } from '../data/veiculos'
import { formatarAno, formatarPreco, kmCurto } from '../lib/format'
import { loja } from '../config/loja'
import { Foto } from './Foto'
import { IconCalendar, IconFuel, IconGauge, IconGear, IconPin } from './Icons'

// Card da página inicial: foto em cima, ficha resumida e preço.
export function CardDestaque({ veiculo, vendido = false }: { veiculo: Veiculo; vendido?: boolean }) {
  const url = `/veiculo/${veiculo.id}`

  return (
    <article className={`cd ${vendido ? 'cd--vendido' : ''}`}>
      <Link to={url} className="cd__foto" tabIndex={-1} aria-hidden>
        <Foto src={veiculo.fotos[0]} alt={`${veiculo.marca} ${veiculo.modelo}`} />
        {vendido && <span className="cd__selo cd__selo--vendido">Vendido</span>}
        {veiculo.status === 'reservado' && <span className="cd__selo">Reservado</span>}
      </Link>

      <div className="cd__corpo">
        <h3 className="cd__nome">
          <Link to={url}>
            {veiculo.marca} {veiculo.modelo} {veiculo.versao}
          </Link>
        </h3>
        <p className="cd__local">
          <IconPin size={14} /> {loja.cidade} - {loja.uf}
        </p>

        <ul className="cd__ficha">
          <li>
            <IconGauge size={16} /> {kmCurto(veiculo.km)} km
          </li>
          <li>
            <IconGear size={16} /> {veiculo.cambio}
          </li>
          <li>
            <IconFuel size={16} /> {veiculo.combustivel}
          </li>
          <li>
            <IconCalendar size={16} /> {formatarAno(veiculo)}
          </li>
        </ul>

        <div className="cd__rodape">
          {vendido ? (
            <span className="cd__vendido">Entregue ao cliente</span>
          ) : (
            <p className="cd__preco">{formatarPreco(veiculo.preco)}</p>
          )}
          <Link to={url} className="btn btn--suave btn--p">
            Ver detalhes
          </Link>
        </div>
      </div>
    </article>
  )
}
