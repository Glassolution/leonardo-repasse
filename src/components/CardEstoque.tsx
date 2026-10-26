import { Link } from 'react-router-dom'
import type { Veiculo } from '../data/veiculos'
import { abaixoFipe, formatarAno, formatarMoeda, formatarPreco, kmCurto } from '../lib/format'
import { Foto } from './Foto'
import { IconCheck, IconInfo } from './Icons'

// Card da página de estoque, no formato de inventário: título e preço no topo,
// destaque central, foto, três números e lista de características.
export function CardEstoque({ veiculo }: { veiculo: Veiculo }) {
  const diferenca = abaixoFipe(veiculo)
  const caracteristicas = [`Cor ${veiculo.cor.toLowerCase()}`, `Motor ${veiculo.motor}`, `Câmbio ${veiculo.cambio === 'CVT' ? 'CVT' : veiculo.cambio.toLowerCase()}`, veiculo.categoria]

  return (
    <Link to={`/veiculo/${veiculo.id}`} className="ce">
      <div className="ce__topo">
        <div>
          <h3 className="ce__modelo">
            {veiculo.marca} {veiculo.modelo}
          </h3>
          <p className="ce__versao">{veiculo.versao}</p>
          <p className="ce__versao">
            {veiculo.status === 'reservado' ? <strong>Reservado</strong> : <strong>Repasse</strong>} com{' '}
            {veiculo.km.toLocaleString('pt-BR')} km
          </p>
        </div>
        <div className="ce__valores">
          <p className="ce__preco">
            {formatarPreco(veiculo.preco)}
            {veiculo.precoAnterior && <s>{formatarMoeda(veiculo.precoAnterior)}</s>}
          </p>
          {veiculo.fipe && (
            <p className="ce__fipe">
              FIPE {formatarMoeda(veiculo.fipe)} <IconInfo size={13} />
            </p>
          )}
        </div>
      </div>

      {diferenca && (
        <p className="ce__pilula">
          {formatarMoeda(diferenca)} abaixo da FIPE <IconInfo size={14} />
        </p>
      )}

      <div className="ce__foto">
        <Foto src={veiculo.fotos[0]} alt={`${veiculo.marca} ${veiculo.modelo} ${veiculo.versao}`} />
      </div>

      <dl className="ce__numeros">
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

      <div className="ce__listas">
        <ul>
          {caracteristicas.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <ul className="ce__itens">
          {veiculo.itens.map((i) => (
            <li key={i}>
              <IconCheck size={14} /> {i}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  )
}
