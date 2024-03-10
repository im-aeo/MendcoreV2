#!/usr/bin/env bash

echo "Running composer"
composer install --no-dev --prefer-dist --no-interaction --no-autoloader --no-scripts -o --working-dir=/var/www/html
composer dump-autoload --optimize

echo "Clearing old caches..."
php artisan cache:clear

echo "Caching routes and configuration..."
php artisan config:cache
php artisan route:cache

echo "Running migrations..."
php artisan migrate --force

echo "Running seeders..."
php artisan db:seed

echo "Running vite..."
npm i --progress=false
npm run build
