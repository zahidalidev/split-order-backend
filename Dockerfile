FROM node:14-alpine as development

WORKDIR /src

COPY ./split-order-backend/package.json .
COPY ./split-order-backend/package-lock.json .

RUN npm install

COPY ./split-order-backend .

RUN npm install typescript
RUN npm run build


FROM node:14-alpine as production

# keys just for test purpose
ENV NODE_ENV=production
ENV DB_CONN_STRING="mongodb+srv://zahidali123:zahidali123@cluster0.b5iky.mongodb.net/splitorder"
ENV JWT_PRIVATE_KEY="zahidali123"
# COPY --chown=node:node .env .

WORKDIR /src
COPY ./split-order-backend/package.json .
COPY ./split-order-backend/package-lock.json .
RUN npm install --only=production
COPY --from=development /src/dist ./dist
CMD ["node", "dist/index.js"]