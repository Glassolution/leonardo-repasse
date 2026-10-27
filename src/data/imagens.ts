// Fotos ilustrativas do Wikimedia Commons (licenças livres, crédito na página /creditos).
// Troque pelas fotos reais dos veículos em /public/veiculos/<id>/.

const arquivos = {
  hrv: 'Honda_HR-V_Hybrid_1X7A0427.jpg',
  tcross: 'Volkswagen_T-Cross_1X7A0363.jpg',
  toro: 'Fiat_Toro_2022_1.8_Freedom_in_Punta_del_Este_(front).jpg',
  strada: 'Fiat_Strada_2020_Volcano_in_Montevideo_(front).jpg',
  polo: '2024_Volkswagen_Polo_Track_1.6_MSi.jpg',
  creta: 'Hyundai_Creta_1.6_Plus_2022.jpg',
  corollaCross: 'Toyota_Corolla_Cross_1.8_GR-S_HEV_2023_(1).jpg',
  hilux: '2021_Toyota_Hilux_Revo_GR_Sport_Double-Cab_2.8_4x4.jpg',
  onix: 'Chevrolet_Onix.JPG',
  compass: '0_Jeep_Compass_(MP)_1.jpg',
  kicks: '0_Nissan_Kicks_(P15)_1.jpg',
  hb20: 'HB20X_2nd_Generation_Frontal_View_(cropped).jpg',
  paisagem: 'Pragser_Wildsee,_Italy_(Unsplash_p7huyfLrdzc).jpg',
  paisagem2: 'Pragser_Wildsee_-_Lago_di_Braies_04.jpg',
} as const

export type Imagem = keyof typeof arquivos

export const urlImagem = (chave: Imagem, largura = 1280) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(arquivos[chave])}?width=${largura}`

export const creditos = Object.entries(arquivos).map(([chave, arquivo]) => ({
  chave: chave as Imagem,
  arquivo: arquivo.replace(/_/g, ' '),
  pagina: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(arquivo)}`,
}))
