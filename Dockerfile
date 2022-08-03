FROM node:alpine
WORKDIR /src
COPY . ./
COPY package.json ./
COPY tsconfig.json ./
RUN npm install
RUN npm run build
## this is stage two , where the app actually runs
FROM node:alpine
WORKDIR /src
COPY package.json ./
RUN npm install --only=production
COPY --from=0 /src/dist .
COPY --chown=node:node .env .
RUN npm install pm2 -g
EXPOSE 80
CMD ["pm2-runtime","index.js"]