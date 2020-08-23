FROM node:12

# Configura Diretorios==================================================================================================
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

# Copia Aplicacao ======================================================================================================
COPY . /home/node/app

# Instala Dependencias =================================================================================================
RUN npm install --no-optional

# Compila Aplicacao =================================================================================================
RUN npm run build-prod