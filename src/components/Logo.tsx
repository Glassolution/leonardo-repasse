type Props = { variante?: 'clara' | 'escura'; className?: string }

// Reprodução tipográfica do logo da loja: "Leonardo" com "• REPASSES •" abaixo.
export function Logo({ variante = 'clara', className = '' }: Props) {
  return (
    <span className={`logo logo--${variante} ${className}`}>
      <span className="logo__nome">Leonardo</span>
      <span className="logo__sub">
        <i />
        Repasses
        <i />
      </span>
    </span>
  )
}
