import { Link } from 'react-router-dom'
import { Faixa } from '../components/Faixa'

export default function NaoEncontrado() {
  return (
    <section className="nao-encontrado">
      <Faixa titulo="Página não encontrada" ano="404" tamanho="g" />
      <p>Esse endereço não existe ou o veículo saiu do catálogo.</p>
      <Link to="/#estoque" className="btn btn--azul">
        Ver estoque
      </Link>
    </section>
  )
}
