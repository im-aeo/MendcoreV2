#!/usr/bin/env bash

echo "Installing Packages"
composer update --no-dev --prefer-dist --no-interaction --optimize-autoloader --no-scripts -o --working-dir=/var/www/html

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
npm install
npm run build
