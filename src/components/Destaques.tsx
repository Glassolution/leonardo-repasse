import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { IconCar, IconCarCheck, IconInstagram, IconPin, IconSwap } from './Icons'
import { linkInstagram } from '../config/loja'

type Item = { label: string; icon: ReactNode; to?: string; href?: string }

const itens: Item[] = [
  { label: 'Estoque', icon: <IconCar size={30} />, to: '/#estoque' },
  { label: 'Vendidos', icon: <IconCarCheck size={30} />, to: '/#vendidos' },
  { label: 'Condições', icon: <IconSwap size={30} />, to: '/#condicoes' },
  { label: 'Localização', icon: <IconPin size={30} />, to: '/#localizacao' },
  { label: 'Instagram', icon: <IconInstagram size={28} />, href: linkInstagram },
]

// Atalhos no formato dos destaques do Instagram da loja.
export function Destaques() {
  return (
    <nav className="destaques" aria-label="Atalhos">
      {itens.map((i) => {
        const conteudo = (
          <>
            <span className="destaque__anel">
              <span className="destaque__circulo">{i.icon}</span>
            </span>
            <span className="destaque__label">{i.label}</span>
          </>
        )
        return i.to ? (
          <Link key={i.label} to={i.to} className="destaque">
            {conteudo}
          </Link>
        ) : (
          <a key={i.label} href={i.href} className="destaque" target="_blank" rel="noreferrer">
            {conteudo}
          </a>
        )
      })}
    </nav>
  )
}
