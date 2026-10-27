import { useLayoutEffect } from 'react'

// Elementos que surgem ao entrar na tela. Irmãos do mesmo seletor entram em sequência.
const SELETORES = [
  '.lp-faixa__item',
  '.lp-topo',
  '.lp-tipo',
  '.lp-oferta',
  '.av',
  '.lp-grade .cv',
  '.lp-trilho .cv',
  '.lp-depo',
  '.lp-membro',
  '.lp-aviso__grid > *',
  '.vp__principal > *',
  '.vp__lateral > *',
  '.secao__topo',
  '.grade-destaque > *',
  '.footer__grid > *',
].join(',')

const PASSO_MS = 80
const MAX_ATRASO_MS = 400

/** Liga a animação de revelação na rolagem. Roda de novo a cada troca de página. */
export function useRevelar(chave: string) {
  // useLayoutEffect: a classe entra antes da primeira pintura, sem piscar o conteúdo.
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) return

    const elementos = Array.from(document.querySelectorAll<HTMLElement>(SELETORES))

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue
          const el = e.target as HTMLElement
          el.classList.add('is-visivel')
          observador.unobserve(el)
          // Ao terminar, devolve o elemento ao estilo normal (hover, transições próprias).
          const atraso = parseInt(el.style.getPropertyValue('--atraso')) || 0
          window.setTimeout(() => el.classList.remove('revela', 'is-visivel'), atraso + 750)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    for (const el of elementos) {
      const irmaos = el.parentElement
        ? Array.from(el.parentElement.children).filter((c) => c.matches(SELETORES))
        : [el]
      const indice = Math.max(0, irmaos.indexOf(el))
      el.style.setProperty('--atraso', `${Math.min(indice * PASSO_MS, MAX_ATRASO_MS)}ms`)
      el.classList.add('revela')
      observador.observe(el)
    }

    return () => observador.disconnect()
  }, [chave])
}
