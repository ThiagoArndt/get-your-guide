#!/bin/bash

# Load NVM and Node.js environment
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Change to the application directory
cd /var/www/html

sudo fuser -k 3000/tcp

# Start the application
nohup npm run start &
