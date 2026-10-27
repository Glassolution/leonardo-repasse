# Leonardo Repasse de Veículos — Catálogo

Site de catálogo da Leonardo Repasse de Veículos (Folha 27, Marabá - PA). Feito com Vite + React + TypeScript.

## Rodar localmente

```bash
npm install
npm run dev
```

## Publicar na Vercel

1. Importe este repositório em vercel.com/new.
2. A Vercel detecta o Vite sozinha (build `npm run build`, saída `dist`).
3. O `vercel.json` já cuida das rotas (`/veiculo/...`).

## Páginas

- `/` — página inicial (busca, categorias, oferta especial, recém-chegados, maiores descontos sobre a FIPE, lojistas, vendidos, marcas)
- `/estoque` — catálogo único com filtros (marca, câmbio, preço, categoria, cor, ano, combustível, itens, abaixo da FIPE)
- `/veiculo/<id>` — detalhe do veículo com botão de WhatsApp
- `/creditos` — créditos das fotos ilustrativas

## Atualizar o estoque

Tudo fica em `src/data/veiculos.ts`. Cada veículo:

```ts
{
  id: 'honda-hr-v-exl-2023',        // vira /veiculo/honda-hr-v-exl-2023
  marca: 'Honda',
  modelo: 'HR-V',
  versao: '1.5 EXL CVT',
  categoria: 'SUV',                 // Hatch | Sedã | SUV | Picape
  anoFabricacao: 2022,
  anoModelo: 2023,
  km: 31200,
  motor: '1.5',
  cambio: 'CVT',                    // Manual | Automático | CVT
  combustivel: 'Flex',              // Flex | Gasolina | Diesel | Híbrido
  cor: 'Branco',
  preco: 138900,                    // sem preço aparece "Consultar valor"
  precoAnterior: 142900,            // opcional, aparece riscado
  fipe: 145600,                     // opcional, calcula "abaixo da FIPE"
  itens: ['Multimídia', 'Câmera de ré'],
  fotos: ['/veiculos/honda-hr-v-exl-2023/1.jpg', '/veiculos/honda-hr-v-exl-2023/2.jpg'],
  status: 'disponivel',             // disponivel | reservado | vendido
  observacoes: 'Texto livre sobre o carro.',
  entrada: '2026-10-20',            // ordena "mais recentes"
}
```

- Fotos reais: coloque em `public/veiculos/<id>/` (JPG ou WEBP, 1600px de largura basta).
- `status: 'vendido'` tira o carro do estoque e leva para "Vendidos recentemente".

## Imagens ilustrativas

As fotos atuais vêm do Wikimedia Commons (licenças livres) e são carregadas direto de lá
(`src/data/imagens.ts`). Os créditos ficam em `/creditos`. Quando trocar pelas fotos reais da loja,
a página de créditos pode ser removida.

## Dados da loja

WhatsApp, endereço e Instagram ficam em `src/config/loja.ts`.

> O número de WhatsApp foi lido na fachada da loja (foto do Instagram). Confirme antes de publicar.
> O estoque atual é de EXEMPLO (preços, km e fotos ilustrativos). Troque pelos veículos reais antes de divulgar.
> As avaliações em `src/data/avaliacoes.ts` são textos genéricos do MVP. Troque por avaliações reais ou esvazie a lista antes de publicar.
