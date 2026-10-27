import { useEffect } from 'react'
import { creditos } from '../data/imagens'
import { loja } from '../config/loja'

export default function Creditos() {
  useEffect(() => {
    document.title = `Créditos das imagens | ${loja.nome}`
  }, [])

  return (
    <section className="container creditos">
      <h1>Créditos das imagens</h1>
      <p>
        As fotos de veículos deste site são ilustrativas e vêm do Wikimedia Commons, publicadas sob licenças livres.
        Autor e licença de cada foto estão na página do arquivo.
      </p>
      <ul>
        {creditos.map((c) => (
          <li key={c.chave}>
            <a href={c.pagina} target="_blank" rel="noreferrer">
              {c.arquivo}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
