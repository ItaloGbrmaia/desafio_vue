📷 Desafio Vue — Galeria de Imagens com Scroll Infinito

# Clone o repositório

git clone https://github.com/ItaloGbrmaia/desafio_vue

# Acesse a pasta

cd desafio_vue

# Instale as dependências

npm install

# Rode o projeto em ambiente de desenvolvimento

npm run dev

Configuração de .env
Criamos uma variável global para a API do Pexels no arquivo .env:

env
Copiar
Editar
VITE_PEXELS_API_KEY=F5T5KtFaebWi2bepGnHWhnMVlGkOL8QWra0zYQmCaU1PpR1WhIcezzaM
Arquitetura em Camadas
Organizamos o projeto em camadas para separar responsabilidades:

services/http → Adaptador HTTP baseado em Axios, com headers e tratamento de erro centralizado.

repositories → Camada que comunica com a API e abstrai o uso do cliente HTTP.

stores (Pinia) → Gerencia o estado da aplicação e faz a ponte entre repositório e view.

components → Componentes reutilizáveis, como PhotoCard.vue.

Scroll Infinito
Com o useIntersectionObserver da lib @vueuse/core para detectar o fim da rolagem e carregar mais resultados automaticamente.

Busca com Debounce
Para evitar múltiplas requisições desnecessárias enquanto o usuário digita, usamos o debouncedRef do @vueuse/core com atraso de 300ms. Além disso, a busca inicial carrega imagens de "Natureza" automaticamente.

Principais Bibliotecas Utilizadas
Vue 3 + Vite + TypeScript

Pinia

VueUse — para debounce e observer

Axios — adaptado em HttpClient

Tailwind CSS — para responsividade e design

Funcionalidades
Busca com debounce (300ms)

Scroll infinito

Layout responsivo (grid adaptável)

Componentização dos cards

Tratamento de erros

Feedback visual durante loading

Lazy loading de imagens (com v-lazy)

Bloqueio de requisições duplicadas
