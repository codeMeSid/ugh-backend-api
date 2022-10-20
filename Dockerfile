FROM node:19.0.0-alpine3.16

# Installing dependencies
COPY package*.json .
RUN npm install

# Copying source files
COPY . .

EXPOSE 4000

# Building app
RUN npm run build

# Running the app
CMD npm start