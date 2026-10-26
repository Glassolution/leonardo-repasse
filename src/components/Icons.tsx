type P = { size?: number; className?: string }

const base = (size = 20) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
})

export const IconWhatsApp = ({ size = 20, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.71.23 1.36.2 1.88.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.35-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43a9.38 9.38 0 0 1 9.42 9.44c0 5.2-4.23 9.43-9.43 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.6l6.01-1.58a11.3 11.3 0 0 0 5.43 1.38h.01c6.25 0 11.34-5.08 11.35-11.34 0-3.03-1.18-5.88-3.32-8.02" />
  </svg>
)

export const IconInstagram = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
  </svg>
)

export const IconPin = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.4" />
  </svg>
)

export const IconCar = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4 15.5V12l1.8-4.4A2 2 0 0 1 7.7 6.3h8.6a2 2 0 0 1 1.9 1.3L20 12v3.5" />
    <path d="M3 12h18v4.5a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1h-11v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" />
    <path d="M6.5 14h1.5M16 14h1.5" />
  </svg>
)

export const IconCarCheck = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M3 15.5V12l1.6-4a2 2 0 0 1 1.9-1.3h7.2a2 2 0 0 1 1.9 1.3l1 2.5" />
    <path d="M2.5 12H12M2.5 12v4a1 1 0 0 0 1 1H5a1 1 0 0 0 1-1v-.8h5" />
    <circle cx="17.5" cy="16" r="4.2" />
    <path d="m15.7 16 1.2 1.2 2.4-2.4" />
  </svg>
)

export const IconSwap = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M20 9a8 8 0 0 0-14.5-3.5M4 5v4h4" />
    <path d="M4 15a8 8 0 0 0 14.5 3.5M20 19v-4h-4" />
  </svg>
)

export const IconArrowRight = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const IconArrowLeft = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
)

export const IconChevron = ({ size, className, dir = 'right' }: P & { dir?: 'left' | 'right' }) => (
  <svg {...base(size)} className={className}>
    {dir === 'right' ? <path d="m9 6 6 6-6 6" /> : <path d="m15 6-6 6 6 6" />}
  </svg>
)

export const IconSearch = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </svg>
)

export const IconShare = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3v12M7.5 7.5 12 3l4.5 4.5" />
    <path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
  </svg>
)

export const IconClose = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const IconCheck = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)

export const IconCheckCircle = ({ size, className }: P) => (
  <svg width={size ?? 20} height={size ?? 20} viewBox="0 0 24 24" aria-hidden className={className}>
    <circle cx="12" cy="12" r="10" fill="currentColor" />
    <path d="m7.5 12.3 3 3 6-6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconInfo = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 7.6v.1" />
  </svg>
)

export const IconGauge = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4.2 17a9 9 0 1 1 15.6 0" />
    <path d="m12 13 4-4" />
    <circle cx="12" cy="13" r="1.2" />
  </svg>
)

export const IconGear = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="6" cy="6" r="2" />
    <circle cx="12" cy="6" r="2" />
    <circle cx="18" cy="6" r="2" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="12" cy="18" r="2" />
    <path d="M6 8v8M12 8v8M18 8v4H6" />
  </svg>
)

export const IconFuel = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4 20V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v15M3 20h12M4 10h10" />
    <path d="M14 8h2a2 2 0 0 1 2 2v6.5a1.5 1.5 0 0 0 3 0V8l-3-3" />
  </svg>
)

export const IconCalendar = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
)

export const IconPhone = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M5 4h3.5l1.5 4.5-2.2 1.4a11 11 0 0 0 6.3 6.3l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />
  </svg>
)

export const IconHandshake = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m11 17 2 2a1.4 1.4 0 0 0 2-2" />
    <path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2l-3.9-3.9a2.8 2.8 0 0 0-4 0l-.9.9a1.4 1.4 0 1 1-2-2l2.8-2.8a5.7 5.7 0 0 1 7-.8l.5.3a3.3 3.3 0 0 0 2.3.4L21 6" />
    <path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1.4 1.4 0 0 0 2-2M3 4h8" />
  </svg>
)

export const IconKey = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="8" cy="15" r="4.5" />
    <path d="m11.2 11.8 8.3-8.3M17 6l2.5 2.5M14.5 8.5l2 2" />
  </svg>
)

export const IconClock = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export const IconUser = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
  </svg>
)

export const IconWallet = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M19 7V5.5A1.5 1.5 0 0 0 17.5 4H5a2 2 0 0 0 0 4h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V6" />
    <path d="M16 14h.01" />
  </svg>
)

export const IconExpand = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
  </svg>
)

export const IconMenu = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)
