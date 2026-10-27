import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Logo } from './Logo'
import { IconClose, IconMenu, IconWhatsApp } from './Icons'
import { linkWhatsApp } from '../config/loja'

const links = [
  { to: '/', label: 'Início' },
  { to: '/estoque', label: 'Estoque' },
  { to: '/#lojistas', label: 'Lojistas' },
  { to: '/#localizacao', label: 'Localização' },
]

export function Header() {
  const [aberto, setAberto] = useState(false)
  const [rolou, setRolou] = useState(false)
  const { pathname } = useLocation()
  const sobreposto = pathname === '/'

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 40)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  const fechar = () => setAberto(false)
  const escuro = sobreposto && !rolou && !aberto

  return (
    <header className={`header ${escuro ? 'header--sobreposto' : 'header--claro'} ${sobreposto ? 'header--home' : ''}`}>
      <div className="container header__inner">
        <Link to="/" aria-label="Página inicial" onClick={fechar}>
          <Logo variante={escuro ? 'clara' : 'escura'} />
        </Link>

        <nav className={`header__nav ${aberto ? 'is-open' : ''}`} aria-label="Principal">
          {links.map((l) =>
            l.to.includes('#') ? (
              <Link key={l.to} to={l.to} onClick={fechar}>
                {l.label}
              </Link>
            ) : (
              <NavLink key={l.to} to={l.to} onClick={fechar} end>
                {l.label}
              </NavLink>
            ),
          )}
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
