#!/bin/bash

# Exit on errors
set -e

# Define colors for output
GREEN="\033[0;32m"
RED="\033[0;31m"
NC="\033[0m" # No Color

# Display a message in green
echo_success() {
  echo -e "${GREEN}$1${NC}"
}

# Display a message in red
echo_error() {
  echo -e "${RED}$1${NC}"
}

# Check for Node.js
if ! [ -x "$(command -v node)" ]; then
  echo_error "Node.js is not installed. Please install it first."
  exit 1
fi

echo_success "Node.js is installed."

# Check for Yarn
if ! [ -x "$(command -v yarn)" ]; then
  echo_error "Yarn is not installed. Installing Yarn..."
  npm install -g yarn
else
  echo_success "Yarn is installed."
fi

# Install backend dependencies
echo_success "Installing backend dependencies..."
cd ../
yarn install  # Ensure all backend dependencies are installed

# Setup environment variables
if [ ! -f .env ]; then
  echo_success "Creating .env file from .env.example..."
  cp .env.example .env
else
  echo_success ".env file already exists."
fi

# Initialize Prisma database
echo_success "Setting up Prisma database..."
yarn prisma migrate dev --name init

echo_success "Prisma database setup complete."

# Setup frontend
echo_success "Setting up frontend..."
cd web
if [ -x "$(command -v pnpm)" ]; then
  pnpm install  # Install frontend dependencies using pnpm if available
else
  yarn install  # Fallback to Yarn for frontend dependencies
fi

echo_success "Frontend setup complete."

# Return to the main directory
cd ../

echo_success "Setup is complete. You're ready to go!"
