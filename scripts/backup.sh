#!/bin/bash

# Set backup directory and timestamp
timestamp=$(date +"%Y%m%d_%H%M%S")
backup_dir="backups"
archive_name="miyu_backup_$timestamp.tar.gz"

# Create the backup directory if it doesn't exist
mkdir -p "$backup_dir"

# Define directories and files to back up
backup_items=(
    "schema.prisma"
    "prisma/migrations"
    "scripts"
    "src"
    "package.json"
    "package-lock.json"
    "README.md"
    ".env"
)

# Check if all items exist before proceeding
for item in "${backup_items[@]}"; do
    if [ ! -e "$item" ]; then
        echo "Warning: $item does not exist and will be skipped."
    fi
done

# Create the archive
echo "Creating backup archive..."
tar -czf "$backup_dir/$archive_name" "${backup_items[@]}" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "Backup successfully created: $backup_dir/$archive_name"
else
    echo "Error occurred during backup creation."
    exit 1
fi

# Optional: Clean up old backups (keep last 5 backups)
echo "Cleaning up old backups..."
ls -tp "$backup_dir" | grep -v '/$' | tail -n +6 | xargs -I {} rm -- "$backup_dir/{}"

# Done
echo "Backup process completed."

