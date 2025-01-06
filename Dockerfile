# Base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Generate Prisma client
RUN npx prisma generate

# Expose the port your application runs on
EXPOSE 3000

# Define environment variables for Prisma
ENV PRISMA_CLIENT_ENGINE_TYPE="binary"
ENV DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase" # Replace with your actual database URL

# Start the application
CMD ["npm", "run", "start"]

