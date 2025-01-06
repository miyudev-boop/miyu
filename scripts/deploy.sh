#!/bin/bash

# Deployment script for Miyu project

# Variables
deployment_dir="/var/www/miyu" # Change this to your server's deployment directory
backup_dir="backups"
timestamp=$(date +"%Y%m%d_%H%M%S")

# Create a backup before deploying
echo "Creating backup of current deployment..."
mkdir -p "$backup_dir"
tar -czf "$backup_dir/miyu_deploy_backup_$timestamp.tar.gz" "$deployment_dir" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "Backup successfully created: $backup_dir/miyu_deploy_backup_$timestamp.tar.gz"
else
    echo "Error occurred during backup creation. Aborting deployment."
    exit 1
fi

# Pull the latest changes from the repository
echo "Pulling latest changes from Git..."
git pull origin main

if [ $? -ne 0 ]; then
    echo "Error pulling latest changes from Git. Aborting deployment."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "Error installing dependencies. Aborting deployment."
    exit 1
fi

# Build the project (if applicable)
echo "Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "Error during build process. Aborting deployment."
    exit 1
fi

# Apply Prisma migrations
echo "Applying database migrations..."
npx prisma migrate deploy

if [ $? -ne 0 ]; then
    echo "Error applying database migrations. Aborting deployment."
    exit 1
fi

# Restart the application (using PM2, systemd, or another process manager)
echo "Restarting the application..."
pm run start

if [ $? -ne 0 ]; then
    echo "Error restarting the application. Please check the logs."
    exit 1
fi

# Done
echo "Deployment completed successfully!"

