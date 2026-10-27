import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { IconCheck, IconChevron } from './Icons'

export type Opcao = { valor: string; rotulo: string; total?: number }

type Props = {
  rotulo: string
  valor: string
  opcoes: Opcao[]
  onChange: (valor: string) => void
}

// Campo da barra de busca com lista própria (no lugar do <select> nativo).
export function Seletor({ rotulo, valor, opcoes, onChange }: Props) {
  const [aberto, setAberto] = useState(false)
  const [ativo, setAtivo] = useState(0)
  const raiz = useRef<HTMLDivElement>(null)
  const id = useId()
  const atual = opcoes.find((o) => o.valor === valor) ?? opcoes[0]

  useEffect(() => {
    if (!aberto) return
    const fora = (e: PointerEvent) => {
      if (!raiz.current?.contains(e.target as Node)) setAberto(false)
    }
    document.addEventListener('pointerdown', fora)
    return () => document.removeEventListener('pointerdown', fora)
  }, [aberto])

  const abrir = () => {
    setAtivo(Math.max(0, opcoes.findIndex((o) => o.valor === valor)))
    setAberto(true)
  }

  const escolher = (o: Opcao) => {
    onChange(o.valor)
    setAberto(false)
  }

  const teclado = (e: KeyboardEvent) => {
    if (!aberto) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault()
        abrir()
      }
      return
    }
    if (e.key === 'Escape') setAberto(false)
    else if (e.key === 'ArrowDown') setAtivo((i) => Math.min(i + 1, opcoes.length - 1))
    else if (e.key === 'ArrowUp') setAtivo((i) => Math.max(i - 1, 0))
    else if (e.key === 'Enter' || e.key === ' ') escolher(opcoes[ativo])
    else if (e.key === 'Tab') setAberto(false)
    else return
    e.preventDefault()
  }

  return (
    <div className={`seletor ${aberto ? 'is-aberto' : ''}`} ref={raiz}>
      <button
        type="button"
        className="seletor__campo"
        aria-haspopup="listbox"
        aria-expanded={aberto}
        aria-controls={id}
        onClick={() => (aberto ? setAberto(false) : abrir())}
        onKeyDown={teclado}
      >
        <span className="seletor__rotulo">{rotulo}</span>
        <span className={`seletor__valor ${valor ? 'is-escolhido' : ''}`}>{atual.rotulo}</span>
        <IconChevron size={16} className="seletor__seta" />
      </button>

      {aberto && (
        <ul className="seletor__lista" role="listbox" id={id} aria-label={rotulo}>
          {opcoes.map((o, i) => (
            <li
              key={o.valor}
              role="option"
              aria-selected={o.valor === valor}
              className={`${i === ativo ? 'is-ativo' : ''} ${o.total === 0 ? 'is-vazio' : ''}`}
              onPointerEnter={() => setAtivo(i)}
              onClick={() => escolher(o)}
            >
              <span>{o.rotulo}</span>
              {o.total !== undefined && <small>{o.total}</small>}
              {o.valor === valor && <IconCheck size={16} className="seletor__ok" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
