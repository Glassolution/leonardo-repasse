import { useState } from 'react'
import { IconCar } from './Icons'

type Props = { src?: string; alt: string; className?: string; carregamento?: 'lazy' | 'eager' }

// Imagem com reserva visual caso a foto não carregue.
export function Foto({ src, alt, className = '', carregamento = 'lazy' }: Props) {
  const [falhou, setFalhou] = useState(false)

  if (!src || falhou) {
    return (
      <div className={`foto foto--vazia ${className}`} role="img" aria-label={alt}>
        <IconCar size={64} />
      </div>
    )
  }

  return (
    <img
      className={`foto ${className}`}
      src={src}
      alt={alt}
      loading={carregamento}
      decoding="async"
      onError={() => setFalhou(true)}
    />
  )
}
