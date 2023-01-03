FROM node:16
WORKDIR /usr/users-api
COPY package.json .
COPY . .
EXPOSE 8000
RUN npm config set registry https://registry.npmjs.org/
# RUN npm install -g npm@8.19.3
# RUN npm install --production
ENV DATABASE_HOST=host.docker.internal
RUN npm install
# RUN npm run build
CMD [ "npm", "run", "dev" ]