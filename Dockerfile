FROM node:16
# RUN npm install -g nodemon
WORKDIR /usr/users-api
COPY package.json .
COPY . .
EXPOSE 8000
RUN npm config set registry http://registry.npmjs.org/
RUN npm install
CMD ./start.sh
# [ "npm", "run", "dev" ]