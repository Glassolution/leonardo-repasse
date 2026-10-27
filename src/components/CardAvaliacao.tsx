import type { Avaliacao } from '../data/avaliacoes'
import { IconUser } from './Icons'

export function CardAvaliacao({ avaliacao }: { avaliacao: Avaliacao }) {
  const { nome, cidade, nota, texto, foto } = avaliacao
  return (
    <figure className="av">
      <figcaption className="av__topo">
        {foto ? (
          <img className="av__foto" src={foto} alt="" />
        ) : (
          <span className="av__foto av__foto--icone" aria-hidden>
            <IconUser size={24} />
          </span>
        )}
        <span>
          <strong>{nome}</strong>
          <small>{cidade}</small>
          <span className="av__estrelas" aria-label={`Nota ${nota} de 5`}>
            {'★★★★★'.slice(0, nota)}
            <i>{'★★★★★'.slice(nota)}</i>
          </span>
        </span>
      </figcaption>
      <blockquote>{texto}</blockquote>
    </figure>
  )
}
