FROM node:23-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the NextJS application
RUN npm run build

# Expose port 3000 and start the NextJS app
EXPOSE 3000
CMD ["npm", "start"]
