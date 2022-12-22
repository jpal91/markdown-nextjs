cd /home/ec2-user/md-next
pm2 start "next start"
pm2 startup
pm2 save
pm2 restart all