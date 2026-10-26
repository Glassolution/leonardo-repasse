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

## Atualizar o estoque

Tudo fica em `src/data/veiculos.ts`. Cada veículo:

```ts
{
  id: 'honda-hr-v-exl-2025',        // vira /veiculo/honda-hr-v-exl-2025
  marca: 'Honda',
  modelo: 'HR-V',
  versao: 'EXL',
  categoria: 'SUV',                 // Hatch | Sedã | SUV | Picape
  anoFabricacao: 2025,
  anoModelo: 2025,
  km: 18000,
  cambio: 'CVT',
  combustivel: 'Flex',
  cor: 'Branco',
  preco: 149900,                    // sem preço aparece "Consultar valor"
  fotos: ['/veiculos/honda-hr-v-exl-2025/1.jpg', '/veiculos/honda-hr-v-exl-2025/2.jpg'],
  status: 'disponivel',             // disponivel | reservado | vendido
  observacoes: 'Texto livre sobre o carro.',
  entrada: '2026-10-20',            // ordena "chegaram por último"
}
```

- Fotos: coloque em `public/veiculos/<id>/` (JPG ou WEBP, 1600px de largura é suficiente).
- Sem foto, o card mostra a faixa azul com modelo e ano, no mesmo estilo dos posts.
- `status: 'vendido'` tira o carro do estoque e leva para "Entregues recentemente".

## Dados da loja

WhatsApp, endereço e Instagram ficam em `src/config/loja.ts`.

> O número de WhatsApp foi lido na fachada da loja (foto do Instagram). Confirme antes de publicar.
> O estoque atual é de exemplo, montado a partir dos posts; troque pelos veículos reais.
