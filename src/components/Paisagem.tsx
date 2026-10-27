// Paisagem de fundo do hero: montanhas com névoa, linha de árvores e lago com reflexo.
// Desenhada em SVG para não depender de foto externa.

const LARGURA = 1600
const HORIZONTE = 400

// Gerador simples e determinístico para a silhueta das árvores.
function aleatorio(semente: number) {
  let s = semente
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function arvores(inicio: number, fim: number, altura: number, semente: number) {
  const r = aleatorio(semente)
  let d = `M${inicio},${HORIZONTE}`
  for (let x = inicio; x <= fim; x += 6) {
    const h = altura * (0.6 + r() * 0.4)
    d += ` L${x + 3},${HORIZONTE - h} L${x + 6},${HORIZONTE - h * 0.62}`
  }
  return `${d} L${fim + 6},${HORIZONTE} Z`
}

// Árvores mais altas nas bordas, quase nada no centro.
const arvoresEsq = arvores(0, 430, 92, 7)
const arvoresDir = arvores(1050, LARGURA, 118, 13)
const arvoresFundo = arvores(380, 1120, 26, 21)

export function Paisagem({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox={`0 0 ${LARGURA} 600`} preserveAspectRatio="xMidYMax slice" aria-hidden>
      <defs>
        <linearGradient id="pz-ceu" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#e3ecf3" />
        </linearGradient>
        <linearGradient id="pz-nevoa" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4f8fb" stopOpacity="0" />
          <stop offset="1" stopColor="#eef3f7" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="pz-lago" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fbac8" />
          <stop offset="0.45" stopColor="#c4d6df" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id="pz-mata" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4d6d63" />
          <stop offset="1" stopColor="#2c463e" />
        </linearGradient>
        <filter id="pz-suave">
          <feGaussianBlur stdDeviation="0.9" />
        </filter>
        <filter id="pz-reflexo">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <linearGradient id="pz-fim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.6" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
      </defs>

      <rect width={LARGURA} height={HORIZONTE} fill="url(#pz-ceu)" />

      <path
        d="M0,300 L120,210 L230,250 L360,140 L470,215 L560,175 L640,240 L760,300 L1600,300 L1600,400 L0,400 Z"
        fill="#c5d4e1"
      />
      <path
        d="M820,300 L940,205 L1030,240 L1150,120 L1260,200 L1360,160 L1480,230 L1600,190 L1600,400 L820,400 Z"
        fill="#bccddb"
      />
      <path d="M0,330 L150,270 L300,320 L460,260 L620,330 L0,330 Z" fill="#a9bfcf" />
      <path d="M980,330 L1120,262 L1260,300 L1420,250 L1600,300 L1600,330 Z" fill="#a3b9ca" />
      <rect y="250" width={LARGURA} height="150" fill="url(#pz-nevoa)" />

      <g filter="url(#pz-suave)">
        <path d={arvoresFundo} fill="#7d978f" opacity="0.5" />
        <path d={arvoresEsq} fill="url(#pz-mata)" />
        <path d={arvoresDir} fill="url(#pz-mata)" />
      </g>

      <rect y={HORIZONTE} width={LARGURA} height={600 - HORIZONTE} fill="url(#pz-lago)" />
      <g transform={`translate(0 ${HORIZONTE * 2}) scale(1 -1)`} opacity="0.18" filter="url(#pz-reflexo)">
        <path d={arvoresEsq} fill="#2f4a42" />
        <path d={arvoresDir} fill="#2f4a42" />
      </g>
      <rect y={HORIZONTE} width={LARGURA} height="2" fill="#ffffff" opacity="0.6" />

      <rect width={LARGURA} height="600" fill="url(#pz-fim)" />
    </svg>
  )
}
