#!/usr/bin/env bash

echo "Running composer"
composer global require hirak/prestissimo
composer install --no-dev --no-interaction --no-autoloader --no-scripts --working-dir=/var/www/html
composer dump-autoload --optimize

echo "Clearing old caches..."
php artisan cache:clear

echo "Caching config..."
php artisan config:cache

echo "Caching and generating routes..."
php artisan trail:generate
php artisan route:cache

echo "Running migrations..."
php artisan migrate --force

echo "Running seeders..."
php artisan db:seed

echo "Running vite..."
npm i --progress=false
npm run build
