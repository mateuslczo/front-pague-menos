# Use uma imagem leve do Node.js
FROM node:20-alpine

# Define diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos de dependências
COPY package*.json ./

# Instala dependências (inclui devDependencies)
RUN npm install

# Copia todo o código da aplicação
COPY . .

# Define variável de ambiente para desenvolvimento
ENV NODE_ENV=development
ENV PORT=3000

# Expondo porta do Next.js
EXPOSE 3000

# Comando para iniciar a aplicação em modo de desenvolvimento
CMD ["npm", "run", "dev"]
