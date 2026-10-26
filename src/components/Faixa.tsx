type Props = { titulo: string; ano?: string; tamanho?: 'p' | 'm' | 'g' }

// Faixa no estilo dos posts da loja: nome em bloco azul e ano em bloco branco.
export function Faixa({ titulo, ano, tamanho = 'm' }: Props) {
  return (
    <span className={`faixa faixa--${tamanho}`}>
      <span className="faixa__titulo">{titulo}</span>
      {ano && <span className="faixa__ano">{ano}</span>}
    </span>
  )
}
