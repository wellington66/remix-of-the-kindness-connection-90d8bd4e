# Plano: Reajuste de preços da página de oferta NutriBaby

## Resumo
Substituir os preços exibidos em `src/routes/index.tsx` conforme abaixo, mantendo os links de checkout do Cakto atuais (decisão do usuário).

| Item                | Preço atual | Novo preço |
|---------------------|-------------|------------|
| Kit Completo (principal) | R$ 47,00  | R$ 29,90   |
| Oferta Básica (Essencial) | R$ 29,90  | R$ 19,90   |
| Upsell de clique + Pop-up de saída | R$ 37,00 | R$ 24,90 |

## Decisões confirmadas com o usuário
- **Links Cakto:** manter os atuais (nenhum URL será alterado).
- **Pop-ups:** os dois (upsell de clique + saída) vão para R$ 24,90.
- **Parcelas:** recalcular 6x aprox. a 1,99%/m sobre R$ 29,90 → **6x de R$ 5,34** (total R$ 32,02).

## ⚠️ Risco que o usuário assumiu
Os links atuais do Cakto apontam para checkouts configurados nos preços antigos (47 / 29,90 / 37). Ao manter os links, o comprador abrirá uma página de pagamento do Cakto com **o preço antigo**, divergindo do exibido no site. Não há correção técnica possível sem novos links — apenas o usuário pode gerá-los no painel do Cakto.

## Edições (todas em `src/routes/index.tsx`)

### A. Kit Completo — 47,00 → 29,90
1. Linha 74: comentário `// R$ 47,00 (Completo)` → `// R$ 29,90 (Completo)`.
2. Linha 1590: `💡 O Kit Completo por R$ 47,00 é muito mais vantajoso` → `R$ 29,90`.
3. Linha 1640: economia `(totalValue - 47.0)` → `(totalValue - 29.90)`.
4. Linha 1687: `R$ 8,89` → `R$ 5,34`.
5. Linha 1691: `ou R$ 47,00 à vista` → `ou R$ 29,90 à vista`.

### B. Oferta Básica — 29,90 → 19,90
6. Linha 75: comentário `// R$ 29,90 (Básico)` → `// R$ 19,90 (Básico)`.
7. Linha 1573: preço do card `R$ 29,90` → `R$ 19,90`.
8. Linha 399 (UpsellModal): `Não, prefiro o básico — R$ 29,90` → `R$ 19,90`.

### C. Pop-ups (Upsell + Saída) — 37,00 → 24,90
9. Linha 76: comentário `// R$ 37,00 (Upsell/Pop-up)` → `// R$ 24,90 (Upsell/Pop-up)`.
10. Linha 259: comentário `// ... pop-up de saída (R$ 37,00)` → `R$ 24,90`.
11. Linha 325 (ExitIntentPopup): `R$ 37,00` → `R$ 24,90`.
12. Linha 392 (UpsellModal): `Upgrade para Completo — R$ 37,00` → `R$ 24,90`.
13. Linha 383 (UpsellModal): delta `mais R$ 7,10` → `mais R$ 5,00` (24,90 − 19,90).

## Itens que permanecem inalterados (verificados)
- Badge `−85% OFF` (linha 1621): com R$ 29,90 sobre R$ 200 de valor real, o desconto é ~85,05% — continua correto.
- `totalValue = 200` (linha 1474): sem mudança.
- URLs `CHECKOUT_URL`, `CHECKOUT_URL_BASIC`, `CHECKOUT_URL_UPSELL`, `EXIT_CHECKOUT_URL` (linhas 74-76, 260): mantidos conforme decisão do usuário.
- CTA fora da oferta já rolam para `#comprar`; sem mudança.

## Validação
- Após editar, rodar typecheck/build (automático pelo harness).
- Verificar no preview: card básico R$ 19,90, card completo R$ 29,90 / 6x R$ 5,34 / à vista R$ 29,90, upsell R$ 24,90, pop-up de saída R$ 24,90, delta do upsell R$ 5,00.
