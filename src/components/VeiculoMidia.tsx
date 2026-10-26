import type { Veiculo } from '../data/veiculos'
import { formatarAno } from '../lib/format'
import { Faixa } from './Faixa'
import { IconCar } from './Icons'

type Props = {
  veiculo: Veiculo
  foto?: string
  tamanhoFaixa?: 'p' | 'm' | 'g'
  comFaixa?: boolean
  carregamento?: 'lazy' | 'eager'
}

export function VeiculoMidia({ veiculo, foto, tamanhoFaixa = 'm', comFaixa = true, carregamento = 'lazy' }: Props) {
  const src = foto ?? veiculo.fotos[0]
  const titulo = [veiculo.modelo, veiculo.versao].filter(Boolean).join(' ')

  return (
    <div className={`midia ${src ? '' : 'midia--vazia'}`}>
      {src ? (
        <img src={src} alt={`${veiculo.marca} ${titulo}`} loading={carregamento} decoding="async" />
      ) : (
        <IconCar className="midia__icone" size={120} />
      )}
      {comFaixa && (
        <div className="midia__faixa">
          <Faixa titulo={titulo} ano={formatarAno(veiculo)} tamanho={tamanhoFaixa} />
        </div>
      )}
    </div>
  )
}
