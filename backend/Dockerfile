###
# Backend Dockerfile
###

# pull the Node.js Docker image
FROM node:lts-alpine

# create the directory inside the container
WORKDIR /usr/src/app

# copy the package.json files from local machine to the workdir in container
COPY package*.json yarn.lock ./

# run yarn install in our local machine
RUN yarn install

# copy the generated modules and all other files to the container
COPY . .

# Rebuild bcrypt to ensure it is compiled for the docker container's environment
RUN apk add --no-cache make gcc g++ python3 && \
    npm rebuild bcrypt --build-from-source && \
    apk del make gcc g++ python3

# our app is running on port 3000 within the container, so need to expose it
EXPOSE 3000

CMD ["yarn", "dev"]
