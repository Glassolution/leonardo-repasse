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
          <p className="footer__bio">Especialistas em venda de veículos. Multimarcas, com repasse para lojistas.</p>
          <div className="footer__sociais">
            <a href={linkInstagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <IconInstagram size={18} />
            </a>
            <a href={linkWhatsApp()} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <IconWhatsApp size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="footer__titulo">Navegação</h3>
          <ul className="footer__lista">
            <li><Link to="/">Início</Link></li>
            <li><Link to="/estoque">Estoque</Link></li>
            <li><Link to="/#lojistas">Para lojistas</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="footer__titulo">Atendimento</h3>
          <ul className="footer__lista">
            <li>
              <a href={linkWhatsApp()} target="_blank" rel="noreferrer">WhatsApp</a>
            </li>
            <li>
              <a href={linkInstagram} target="_blank" rel="noreferrer">Instagram</a>
            </li>
            <li>
              <a href={linkMaps} target="_blank" rel="noreferrer">Como chegar</a>
            </li>
          </ul>
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
              <a href={linkMaps} target="_blank" rel="noreferrer">
                <IconPin size={16} /> {loja.endereco}, {loja.bairro}, {loja.cidade} - {loja.uf}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer__base">
        <span>© {ano} {loja.nome}</span>
        <span>
          Imagens ilustrativas · <Link to="/creditos">Créditos das fotos</Link>
        </span>
      </div>
    </footer>
  )
}
