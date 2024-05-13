#!/bin/bash
npm install
pm2 start npm --name nextjs-apps -- run start -- -p 3000
# Make after_install.sh executable
chmod +x appstart_install.sh
              