#!/bin/bash
npm install
npm install pm2 -g
pm2 stop all
pm2 delete all
# Make before_install.sh executable  
chmod +x before_install.sh

