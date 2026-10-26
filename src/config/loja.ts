// Dados da loja usados em todo o site. Edite aqui para atualizar contato e endereço.
export const loja = {
  nome: 'Leonardo Repasse de Veículos',
  nomeCurto: 'Leonardo',
  cidade: 'Marabá',
  uf: 'PA',
  endereco: 'Folha 27, em frente ao Mix Mateus',
  bairro: 'Nova Marabá',
  // Número lido na fachada da loja. Confirmar antes de publicar.
  whatsapp: '5594981843265',
  telefoneExibicao: '(94) 98184-3265',
  instagram: 'leonardorepassedeveiculos',
  linktree: 'https://linktr.ee/leonardorepasse',
  mapsBusca: 'Folha 27, Mix Mateus, Nova Marabá, Marabá - PA',
}

export const linkInstagram = `https://www.instagram.com/${loja.instagram}/`

export const linkMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loja.mapsBusca)}`

export const linkMapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(loja.mapsBusca)}&z=16&output=embed`

export function linkWhatsApp(mensagem?: string) {
  const texto = mensagem ?? 'Olá! Vim pelo site e gostaria de ver o estoque.'
  return `https://wa.me/${loja.whatsapp}?text=${encodeURIComponent(texto)}`
}
