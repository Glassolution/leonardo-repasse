import { Link } from 'react-router-dom'
import type { Veiculo } from '../data/veiculos'
import { formatarPreco, kmCurto } from '../lib/format'
import { Foto } from './Foto'
import { IconCalendar, IconGauge, IconGear } from './Icons'

// Card compacto da página inicial: foto, nome, preço e três dados.
export function CardVitrine({ veiculo }: { veiculo: Veiculo }) {
  return (
    <Link to={`/veiculo/${veiculo.id}`} className="cv">
      <div className="cv__foto">
        <Foto src={veiculo.fotos[0]} alt={`${veiculo.marca} ${veiculo.modelo}`} />
      </div>
      <div className="cv__corpo">
        <h3 className="cv__nome">
          {veiculo.marca} {veiculo.modelo}
        </h3>
        <p className="cv__versao">{veiculo.versao}</p>
        <p className="cv__preco">{formatarPreco(veiculo.preco)}</p>
        <ul className="cv__dados">
          <li>
            <IconGauge size={15} /> {kmCurto(veiculo.km)} km
          </li>
          <li>
            <IconGear size={15} /> {veiculo.cambio === 'Manual' ? 'Manual' : 'Auto'}
          </li>
          <li>
            <IconCalendar size={15} /> {veiculo.anoModelo}
          </li>
        </ul>
      </div>
    </Link>
  )
}

