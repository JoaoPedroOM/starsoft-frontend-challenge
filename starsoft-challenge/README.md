# Starsoft Challenge

Aplicação desenvolvida com **Next.js**, **TypeScript**, **Redux Toolkit**, **Sass (SCSS)** e **Jest**.

---

## Como Executar o Projeto

### Opção 1: Com Docker

Certifique-se de ter o [Docker](https://www.docker.com/) instalado:

```bash
# Iniciar o container em modo de desenvolvimento
docker-compose up

# (Opcional) Rodar em background com rebuild
docker-compose up -d --build
```
Acesse a aplicação em **`http://localhost:3000`**.

---

### Opção 2: Localmente (Node.js)

Certifique-se de ter o Node.js (v18+) instalado:

```bash
# 1. Instalar dependências
npm install

# 2. Executar o servidor de desenvolvimento
npm run dev
```
Acesse a aplicação em **`http://localhost:3000`**.

---

## 🧪 Testes Automatizados

O projeto conta com suíte de testes unitários e de integração utilizando **Jest** e **React Testing Library**:

```bash
# Executar todos os testes
npm test

# Gerar relatório de cobertura
npm run test:coverage
```

---

## Funcionalidades Implementadas

- **Vitrine de Produtos:** Listagem com imagem, título, categoria, descrição e preço formatado.
  > ⚠️ **Nota sobre os Dados:** Devido a instabilidades/erros na API original da Starsoft durante o desenvolvimento, os produtos são consumidos a partir do mock local estruturado em [`src/data/products.ts`](./src/data/products.ts).
- **Carrinho de Compras Lateral (Drawer):**
  - Abertura e fechamento com animações fluidas (`framer-motion`).
  - Adição de produtos diretamente pelo card.
  - Incremento e decremento de quantidade.
  - Remoção de itens individuais.
  - Cálculo dinâmico e automático do subtotal e valor total.
- **Gerenciamento de Estado Global:** Utilização de **Redux Toolkit** para manter o estado do carrinho consistente em toda a aplicação.
- **Design Responsivo & Acessibilidade:** Layout adaptado para dispositivos móveis, tablets e desktops com estilização modular em SCSS.

---

## Tecnologias Utilizadas

- **Core:** Next.js (App Router), React 19, TypeScript
- **Estilização:** Sass / SCSS Modules, Framer Motion
- **Gerenciamento de Estado & Dados:** Redux Toolkit, React-Redux
- **Testes:** Jest
- **Containerização:** Docker

---

## Limitações e Melhorias Futuras

- [ ] **Integração com API Real:** Reconectar as requisições para a API externa assim que os endpoints estiverem estáveis.