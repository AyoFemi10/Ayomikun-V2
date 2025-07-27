FROM node:lts-buster

COPY packae.json .


RUN npm install pm2 -g
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
