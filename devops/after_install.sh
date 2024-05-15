#!/bin/bash

# Load NVM and Node.js environment
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Change to the application directory
cd /var/www/html

sudo fuser -k 3000/tcp

# Iniciar a aplicação em segundo plano com nohup e redirecionar saída
nohup npm run start > nohup.out 2>&1 &

# Garantir que o script termina corretamente
exit 0