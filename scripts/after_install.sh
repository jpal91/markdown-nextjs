#!/bin/bash
cd /home/ec2-user/md-next
npm install
npm install pm2 -g
npm run build
mv ./nginx/default /etc/nginx/sites-available/default