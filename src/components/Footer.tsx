import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { IconInstagram, IconPhone, IconPin, IconWhatsApp } from './Icons'
import { linkInstagram, linkMaps, linkWhatsApp, loja } from '../config/loja'

const ano = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__marca">
          <Logo />
          <p className="footer__bio">Especialistas em venda de veículos. Multimarcas, com repasse para lojistas.</p>
          <div className="footer__sociais">
            <a href={linkInstagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <IconInstagram size={17} />
            </a>
            <a href={linkWhatsApp()} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <IconWhatsApp size={17} />
            </a>
            <a href={linkMaps} target="_blank" rel="noreferrer" aria-label="Como chegar">
              <IconPin size={17} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="footer__titulo">Navegação</h3>
          <ul className="footer__lista">
            <li><Link to="/">Início</Link></li>
            <li><Link to="/estoque">Estoque</Link></li>
            <li><Link to="/estoque?fipe=1">Abaixo da FIPE</Link></li>
            <li><Link to="/#lojistas">Lojistas</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="footer__titulo">Categorias</h3>
          <ul className="footer__lista">
            <li><Link to="/estoque?categoria=SUV">SUV</Link></li>
            <li><Link to="/estoque?categoria=Sed%C3%A3">Sedã</Link></li>
            <li><Link to="/estoque?categoria=Hatch">Hatch</Link></li>
            <li><Link to="/estoque?categoria=Picape">Picape</Link></li>
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
            <li><Link to="/creditos">Créditos das fotos</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="footer__titulo">Contato</h3>
          <ul className="footer__lista">
            <li>
              <a href={linkWhatsApp()} target="_blank" rel="noreferrer">
                <IconPhone size={15} /> {loja.telefoneExibicao}
              </a>
            </li>
            <li>
              <a href={linkInstagram} target="_blank" rel="noreferrer">
                <IconInstagram size={15} /> @{loja.instagram}
              </a>
            </li>
            <li>
              <a href={linkMaps} target="_blank" rel="noreferrer">
                <IconPin size={15} /> {loja.endereco}, {loja.cidade} - {loja.uf}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer__base">
        © {ano} {loja.nome}. Todos os direitos reservados.
      </div>
    </footer>
  )
}
