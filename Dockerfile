# Imagen base liviana
FROM node:18-alpine

# Crear carpeta de trabajo
WORKDIR /app

# Copiar archivos de configuración primero (para aprovechar la caché de Docker)
COPY package.json yarn.lock ./

# Instalar solo dependencias 
RUN yarn install 

# Copiar el resto de los archivos, incluyendo artifacts y src
COPY . .

# Exponer el puerto del servidor
EXPOSE 4000

# Comando para iniciar el servidor
CMD ["node", "src/index.js"]
