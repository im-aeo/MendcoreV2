# Stage 1: Base image for PHP (Nginx and PHP-FPM)
FROM richarvey/nginx-php-fpm:latest

# Copy the install-php-extensions script with appropriate permissions
ADD --chmod=0755 https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

# Copy your application code
COPY . .

# Environment configuration
ENV SKIP_COMPOSER 1
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

# Install required PHP extensions
RUN install-php-extensions gd xdebug gmp intl mysqli pgsql sodium soap xsl zip redis curl pdo pdo_mysql bcmath json mbstring pdo_pgsql

# Stage 2: Bun environment
FROM oven/bun AS build

WORKDIR /app
COPY bun.lockb .
COPY package.json .

RUN bun install --frozen-lockfile

# Install Bun and project dependencies
RUN apk add --update nodejs npm
RUN npm install -g bun
RUN bun install --frozen-lockfile

# Laravel config
ENV APP_ENV production
ENV APP_DEBUG false
ENV LOG_CHANNEL stderr

# Allow composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER 1

# Set working directory
WORKDIR $WEBROOT

# Expose PHP-FPM port (default: 9000)
EXPOSE 9000

# Run commands
CMD ["/start.sh"]
