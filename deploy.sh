#!/bin/bash

APP_DIR="/home/cobanext/belajarnextjs"
LOG_FILE="/home/cobanext/deployer/log.txt"

echo "Deploy started at $(date)" >> $LOG_FILE

cd $APP_DIR || exit

# Pull latest code
echo "📥 Pulling code..."
git pull origin main >> $LOG_FILE 2>&1

# Install & build
echo "📦 Installing dependencies..."
npm install >> $LOG_FILE 2>&1

echo "🏗️ Building app..."
npm run build >> $LOG_FILE 2>&1

# Restart dengan PM2
echo "🚀 Restarting with PM2..."
pm2 restart cobanext || pm2 start npm --name "cobanext" -- start
echo "✅ Deployment complete"

echo "Deploy finished at $(date)" >> $LOG_FILE
