#use a node image to build the app
FROM node:18-alpine AS build 

#set the working directory
WORKDIR /app

#copy the package.json and package-lock.json files
COPY package*.json ./

#install the dependencies

RUN npm install

#copy the source code
COPY . .

#build the app
RUN npm run build

# Step 7: Use a simple HTTP server to serve the built app
# The server will serve the content on port 3000 (or any other port you choose)
RUN npm install -g serve

# Step 8: Expose the port you want to access the app
EXPOSE 3000

# Step 9: Start the HTTP server to serve the app
CMD ["serve", "-s", "build", "-l", "3000"]

