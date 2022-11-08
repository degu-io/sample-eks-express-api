FROM node:18
WORKDIR /usr/src/app
RUN npm install express
COPY api.js .
CMD ["node", "api"]
