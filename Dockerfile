FROM richarvey/nginx-php-fpm:latest as builder
ADD --chmod=0755 https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*
COPY . .

FROM oven/bun
COPY --from=builder . .
WORKDIR /home/bun/app
COPY ./package.json .
RUN bun install

# Image config
ENV SKIP_COMPOSER 1
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

# Install Bun
FROM oven/bun
WORKDIR /home/bun/app
COPY ./package.json .
RUN bun install

# Env for both laravel and node
ENV APP_ENV production
ENV APP_DEBUG false
ENV LOG_CHANNEL stderr
ENV NODE_ENV production

# Allow composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER 1

# Update node, npm vite
RUN apk add --update nodejs npm
RUN install-php-extensions gd xdebug gmp intl mysqli pgsql sodium soap xsl zip redis curl pdo pdo_mysql bcmath json mbstring pdo_pgsql

CMD ["/start.sh", "bun", "run", "build"]
