import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { IconWhatsApp } from './components/Icons'
import { linkWhatsApp } from './config/loja'
import Home from './pages/Home'
import Veiculo from './pages/Veiculo'
import Estoque from './pages/Estoque'
import Creditos from './pages/Creditos'
import NaoEncontrado from './pages/NaoEncontrado'

function useRolagem() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const alvo = document.getElementById(hash.slice(1))
      if (alvo) {
        alvo.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
}

export default function App() {
  useRolagem()
  const { pathname } = useLocation()

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/veiculo/:id" element={<Veiculo />} />
          <Route path="/creditos" element={<Creditos />} />
          <Route path="*" element={<NaoEncontrado />} />
        </Routes>
      </main>
      <Footer />
      {pathname !== '/estoque' && !pathname.startsWith('/veiculo/') && (
        <a className="whats-flutuante" href={linkWhatsApp()} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp">
          <IconWhatsApp size={28} />
        </a>
      )}
    </>
  )
}
