FROM node:16
WORKDIR /usr/app
COPY . .
RUN yarn install
CMD ["yarn", "dev"]
EXPOSE 3000
