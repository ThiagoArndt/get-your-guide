#!/bin/bash

# Load NVM and Node.js environment
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Change to the application directory
cd /var/www/html

# Start the application
npm run start &

# Wait until the application is running on port 3000
echo "Waiting for the application to start..."
while ! nc -z localhost 3000; do
    sleep 1
done

echo "Application started successfully on port 3000."

# Optionally, you can add additional commands here to perform after the application starts.
# For example:
# echo "Performing additional tasks..."
# <your_additional_commands_here>

# Exit the script
exit 0
