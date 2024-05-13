#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion


npm install
pm2 start npm --name nextjs-apps -- run start -- -p 3000
# Make after_install.sh executable
chmod +x appstart_install.sh
              