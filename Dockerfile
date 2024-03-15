FROM richarvey/nginx-php-fpm:latest
ADD --chmod=0755 https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*
COPY . .

# Image config
ENV SKIP_COMPOSER 1
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

# Env for both laravel and node
ENV APP_ENV local
ENV APP_DEBUG true
ENV LOG_CHANNEL stderr
ENV NODE_ENV production

# Allow composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER 1

# Update node, npm vite
RUN apk update
RUN apk add --no-cache nodejs npm
# RUN apk --no-cache add ca-certificates wget
# RUN wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub
# RUN wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.28-r0/glibc-2.28-r0.apk
# RUN apk add --no-cache --force-overwrite glibc-2.28-r0.apk

# Install packages
RUN npm install
RUN install-php-extensions gd xdebug gmp intl mysqli pgsql sodium soap xsl zip redis curl pdo pdo_mysql bcmath json mbstring pdo_pgsql

# Build Vite assets
RUN npm run build

# Install required packages
RUN apk add --no-cache autoconf g++ make libmemcached-dev

# Install the `memcached` PHP extension with SASL auth enabled
RUN pecl install --configureoptions 'enable-memcached-sasl="yes"' memcached

# Enable the `memcached` PHP extension
RUN docker-php-ext-enable memcached

CMD ["/start.sh"]
