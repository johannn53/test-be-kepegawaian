# Dockerfile

FROM node:18

# *************** Create working directory
WORKDIR /app

# *************** Install dependencies
COPY package*.json ./
RUN npm install

# *************** Copy all app files
COPY . .

# *************** Expose the port
EXPOSE 3000

# *************** Run the app
ENV RUNNING_IN_DOCKER=true
CMD ["node", "app.js"]

