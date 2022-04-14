# Pull code
cd server/reactive-web
git checkout master
git pull origin master

# Build and deploy
cd src/backend
npm install
pm2 stop app
pm2 start app.js