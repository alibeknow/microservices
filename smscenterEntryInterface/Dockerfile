FROM node:alpine3.10

WORKDIR /bcc-app

COPY package.json package-lock.json ./

## Configure npm to work with bank proxy server
RUN npm config set registry 'https://nexus.apps.bcc.kz/repository/npm-group/' && \
    npm i -g typescript ts-node && \
    npm ci && \
    mkdir -m 777 /.config

COPY . ./

CMD ["npm", "start"]
