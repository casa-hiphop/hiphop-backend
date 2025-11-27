FROM node:22.18.0

WORKDIR /app

# Instalar rsync e NestJS CLI
RUN apt-get update && apt-get install -y rsync

COPY . .

RUN npm ci

RUN npm run build

EXPOSE $PORT

CMD ["npm", "start"]
