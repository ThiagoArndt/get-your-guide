#!/bin/bash
sudo chmod +x after_install.sh

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

cd /var/www/html
npm install
npm install pm2 -g
pm2 delete all
pm2 start npm --name nextjs-apps -- run start -- -p 3000
pm2 restart nextjs-apps

              