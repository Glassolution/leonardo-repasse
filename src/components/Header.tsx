import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Logo } from './Logo'
import { IconClose, IconInstagram, IconMenu, IconWhatsApp } from './Icons'
import { linkInstagram, linkMaps, linkWhatsApp } from '../config/loja'

export function Header() {
  const [aberto, setAberto] = useState(false)
  const fechar = () => setAberto(false)
  const { pathname } = useLocation()

  return (
    <header className={`header ${pathname === '/' ? 'header--home' : ''}`}>
      <div className="container header__inner">
        <Link to="/" aria-label="Página inicial" onClick={fechar}>
          <Logo variante="escura" />
        </Link>

        <nav className={`header__nav ${aberto ? 'is-open' : ''}`} aria-label="Principal">
          <NavLink to="/" end onClick={fechar}>
            Início
          </NavLink>
          <NavLink to="/estoque" onClick={fechar}>
            Estoque
          </NavLink>
          <Link to="/#lojistas" onClick={fechar}>
            Lojistas
          </Link>
          <a href={linkMaps} target="_blank" rel="noreferrer">
            Localização
          </a>
          <div className="header__acoes">
            <a className="header__insta" href={linkInstagram} target="_blank" rel="noreferrer">
              <IconInstagram size={18} /> Instagram
            </a>
            <a className="btn btn--azul header__cta" href={linkWhatsApp()} target="_blank" rel="noreferrer">
              <IconWhatsApp size={18} />
              Chamar no WhatsApp
            </a>
          </div>
        </nav>

        <button
          className="header__toggle"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
        >
          {aberto ? <IconClose size={24} /> : <IconMenu size={24} />}
        </button>
      </div>
    </header>
  )
}
