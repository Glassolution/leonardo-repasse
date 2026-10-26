import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { IconInstagram, IconPin, IconWhatsApp } from './Icons'
import { linkInstagram, linkMaps, linkWhatsApp, loja } from '../config/loja'

const ano = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Logo />
          <p className="footer__bio">
            Especialistas em venda de veículos. Multimarcas, com repasse para lojistas.
          </p>
        </div>

        <div>
          <h3 className="footer__titulo">Contato</h3>
          <ul className="footer__lista">
            <li>
              <a href={linkWhatsApp()} target="_blank" rel="noreferrer">
                <IconWhatsApp size={16} /> {loja.telefoneExibicao}
              </a>
            </li>
            <li>
              <a href={linkInstagram} target="_blank" rel="noreferrer">
                <IconInstagram size={16} /> @{loja.instagram}
              </a>
            </li>
            <li>
              <a href={linkMaps} target="_blank" rel="noreferrer">
                <IconPin size={16} /> {loja.endereco}, {loja.cidade} - {loja.uf}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="footer__titulo">Navegação</h3>
          <ul className="footer__lista">
            <li><Link to="/#estoque">Estoque</Link></li>
            <li><Link to="/#vendidos">Vendidos</Link></li>
            <li><Link to="/#condicoes">Condições</Link></li>
            <li><Link to="/#localizacao">Localização</Link></li>
          </ul>
        </div>
      </div>

      <div className="container footer__base">
        <span>© {ano} {loja.nome}</span>
        <span>{loja.cidade} - {loja.uf}</span>
      </div>
    </footer>
  )
}
