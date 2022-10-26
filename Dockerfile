FROM node:19.0.0-alpine3.16

# Installing dependencies
COPY package*.json .
RUN npm install

# Copying source files
COPY . .

EXPOSE 4000

ENV DOMAIN=ugh
ENV MONGO_URI=mongodb+srv://siddhant:tAOdBjJMrQd97RbY@ugh.0clqp.mongodb.net/ugh-manager-prod

# Building app
RUN npm run build

# Running the app
CMD npm start