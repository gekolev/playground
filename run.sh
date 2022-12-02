#!/bin/sh

npm install
npm run build
pm2 delete starter9692
pm2 start --name "starter9692" npm -- run startrbln
sudo cp nginx/starter.rbln7.com /etc/nginx/sites-available/starter.rbln7.com
sudo ln -s -f /etc/nginx/sites-available/starter.rbln7.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
pm2 save
