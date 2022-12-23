cd /home/ec2-user/md-next
sudo -u ec2-user -s
pm2 start "npm run start"
pm2 startup
pm2 save
pm2 restart all