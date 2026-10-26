import type { Veiculo } from '../data/veiculos'
import { VeiculoMidia } from './VeiculoMidia'

export function Vendidos({ veiculos }: { veiculos: Veiculo[] }) {
  return (
    <ul className="vendidos">
      {veiculos.map((v) => (
        <li key={v.id} className="vendido">
          <div className="vendido__midia">
            <VeiculoMidia veiculo={v} tamanhoFaixa="p" />
            <span className="vendido__carimbo">Vendido</span>
          </div>
          <p className="vendido__nome">
            {v.marca} {v.modelo}
          </p>
        </li>
      ))}
    </ul>
  )
}
