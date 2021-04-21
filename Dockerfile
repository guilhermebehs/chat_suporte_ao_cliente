FROM node:15-alpine as builder
WORKDIR /app
ADD package*.json /app/
RUN npm i 
ADD . /app/
RUN npm run build

FROM node:15-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm i --only=prod
EXPOSE 3000
CMD ["npm", "run", "start:prod"]