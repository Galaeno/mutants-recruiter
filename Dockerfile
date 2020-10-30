FROM node:12.19.0

# Crea ruta de la aplicación
WORKDIR /usr/src/app

# Instala dependencias de la aplicación
COPY package*.json ./

RUN npm install

# Copia los recursos de la aplicación
COPY . .

CMD ["npm", "run", "start:dev"]
