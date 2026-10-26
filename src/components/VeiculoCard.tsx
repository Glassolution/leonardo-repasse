import { Link } from 'react-router-dom'
import type { Veiculo } from '../data/veiculos'
import { formatarAno, formatarKm, formatarPreco, mensagemInteresse, nomeCompleto } from '../lib/format'
import { linkWhatsApp } from '../config/loja'
import { VeiculoMidia } from './VeiculoMidia'
import { IconWhatsApp } from './Icons'

export function VeiculoCard({ veiculo }: { veiculo: Veiculo }) {
  const specs = [
    formatarAno(veiculo),
    veiculo.km !== undefined ? formatarKm(veiculo.km) : undefined,
    veiculo.cambio,
    veiculo.combustivel,
  ].filter(Boolean)

  return (
    <article className="card">
      <Link to={`/veiculo/${veiculo.id}`} className="card__midia" tabIndex={-1} aria-hidden>
        <VeiculoMidia veiculo={veiculo} tamanhoFaixa="p" />
        {veiculo.status === 'reservado' && <span className="selo selo--reservado">Reservado</span>}
      </Link>

      <div className="card__corpo">
        <p className="card__marca">{veiculo.marca}</p>
        <h3 className="card__nome">
          <Link to={`/veiculo/${veiculo.id}`}>{[veiculo.modelo, veiculo.versao].filter(Boolean).join(' ')}</Link>
        </h3>
        {specs.length > 0 && (
          <ul className="card__specs">
            {specs.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}

        <div className="card__rodape">
          <span className={`card__preco ${veiculo.preco ? '' : 'card__preco--consulta'}`}>
            {formatarPreco(veiculo.preco)}
          </span>
          <a
            className="card__whats"
            href={linkWhatsApp(mensagemInteresse(veiculo))}
            target="_blank"
            rel="noreferrer"
            aria-label={`Perguntar sobre ${nomeCompleto(veiculo)} no WhatsApp`}
          >
            <IconWhatsApp size={18} />
          </a>
        </div>
      </div>
    </article>
  )
}
