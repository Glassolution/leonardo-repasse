import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { IconClose, IconMenu, IconWhatsApp } from './Icons'
import { linkWhatsApp } from '../config/loja'

const links = [
  { href: '/#estoque', label: 'Estoque' },
  { href: '/#vendidos', label: 'Vendidos' },
  { href: '/#condicoes', label: 'Condições' },
  { href: '/#localizacao', label: 'Localização' },
]

export function Header() {
  const [aberto, setAberto] = useState(false)
  const fechar = () => setAberto(false)

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" aria-label="Página inicial" onClick={fechar}>
          <Logo />
        </Link>

        <nav className={`header__nav ${aberto ? 'is-open' : ''}`} aria-label="Principal">
          {links.map((l) => (
            <Link key={l.href} to={l.href} onClick={fechar}>
              {l.label}
            </Link>
          ))}
          <a className="btn btn--whats header__cta" href={linkWhatsApp()} target="_blank" rel="noreferrer">
            <IconWhatsApp size={18} />
            Chamar no WhatsApp
          </a>
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
