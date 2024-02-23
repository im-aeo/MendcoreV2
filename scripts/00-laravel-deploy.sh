#!/usr/bin/env bash

echo "Running composer"
composer global require hirak/prestissimo
composer install --no-dev --no-interaction --no-autoloader --no-scripts --working-dir=/var/www/html
composer dump-autoload --optimize

echo "Clearing old caches..."
php artisan cache:clear
npm cache clean

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Running migrations..."
php artisan migrate --force

echo "Running seeders..."
php artisan db:seed

echo "Running vite..."
npm i --prefer-offline --no-audit --progress=false
npm run build
