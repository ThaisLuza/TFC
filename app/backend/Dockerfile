FROM node:16-alpine

WORKDIR /app-backend

COPY package.json /app-backend

RUN npm install

COPY . /app-backend

EXPOSE 3001 
# QUANDO VIRAR UM CONTAINER

CMD ["npm", "run", "dev"]
