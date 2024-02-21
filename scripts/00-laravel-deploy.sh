#!/usr/bin/env bash

echo "Running composer"
composer global require hirak/prestissimo
composer install --no-dev --working-dir=/var/www/html

echo "Clearing old caches..."
php artisan cache:clear
php artisan cache:clear --store=redis
npm cache clean --force command

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Running migrations..."
php artisan migrate --force

echo "Running seeders..."
php artisan db:seed

echo "Running vite..."
npm install
npm run build
