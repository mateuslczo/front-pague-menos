# FRONTEND PAGUE MENOS

O projeto **FRONTEND PAGUE MENOS** é uma aplicação Next.js que visa demonstrar:  

- **Login em área corporativa** da empresa.  
- **Persistência básica de dados de insumos**, via backend em C#.

Este guia explica como executar a aplicação usando **Docker** em ambiente de desenvolvimento.

---

## Pré-requisitos

- Docker instalado na máquina.  
- Node.js e npm (opcional, apenas para desenvolvimento local).  
- Projeto com a seguinte estrutura na raiz:

---

## Estrutura do Dockerfile para desenvolvimento

O Dockerfile de desenvolvimento foi configurado para:

- Rodar a aplicação Next.js em **modo dev** (`npm run dev`) com hot reload.  
- Montar o código local no container para refletir alterações em tempo real.  
- Incluir todas as dependências, incluindo devDependencies.

**Principais comandos do Dockerfile:**

```dockerfile
# Usando Node.js Alpine
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=development
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "run", "dev"]

## Passo 1: Criar arquivo `.dockerignore`

Evita copiar arquivos desnecessários para o container:


---

## Passo 2: Build da imagem Docker

Execute o comando abaixo na raiz do projeto (onde está o Dockerfile):

```bash
docker build -t frontend-pague-menos .

## Observações importantes

- Qualquer alteração no código será refletida automaticamente no container.  
- Para usar o backend C# do projeto, certifique-se de que ele está rodando e acessível para o frontend.  
- Este Dockerfile é **exclusivo para desenvolvimento**; para produção, é recomendado usar **multi-stage build** e rodar apenas o build final.

## IA

- Foi usado IA para esclarecimento de dúvidas sobre aplicação de estilos css (puro); uso do fetch e axios para requisições
