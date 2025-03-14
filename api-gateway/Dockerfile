#use the official node.js 18 image wth alpine linux as the base image

FROM node:18-alpine

WORKDIR /use/src/app

#copy the package.json file to the working directory
COPY package*.json ./

RUN npm ci --only=production

#copy the rest of the files to the working directory
COPY . .

EXPOSE 3000 

CMD ["node", "src/server.js"]