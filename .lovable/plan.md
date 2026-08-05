Ajuste simples na landing page para remover a imagem flutuante da mão de bebê do Hero.

### O que será feito
1. Remover a `<div>` flutuante que renderiza `babyHandImg` (mãozinha de bebê segurando alimento) dentro da seção `Hero`.
2. Remover a constante `babyHandImg` que deixará de ser usada no arquivo `src/routes/index.tsx`.
3. Manter a imagem antiga `hero-nutribaby.jpg` no CDN conforme solicitado, sem alterações.

### Escopo
- Apenas `src/routes/index.tsx` será modificado.
- Nenhuma mudança no backend, no design system ou em outras seções da página.

### Validação
- Rodar o build após a edição para garantir que a remoção não quebra a compilação.
- A imagem enviada (mão segurando cenoura) foi usada como referência do elemento a ser removido, e não será incorporada ao site.