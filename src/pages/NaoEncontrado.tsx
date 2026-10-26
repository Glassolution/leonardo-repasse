import { Link } from 'react-router-dom'

export default function NaoEncontrado() {
  return (
    <section className="nao-encontrado">
      <p className="nao-encontrado__codigo">404</p>
      <h1>Página não encontrada</h1>
      <p>Esse endereço não existe ou o veículo saiu do estoque.</p>
      <Link to="/estoque" className="btn btn--azul">
        Ver estoque
      </Link>
    </section>
  )
}
