FROM richarvey/nginx-php-fpm:latest
ADD --chmod=0755 https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
COPY . .

# Install Bun in the specified version
RUN apt update && apt install -y bash curl unzip && \
 curl -fsSL https://bun.sh/install | bash

ENV PATH="${PATH}:/root/.bun/bin"
COPY bun.lockb package.json ./

RUN bun install --frozen-lockfile

# Copy the application sources into the build stage
COPY . .
# Image config
ENV SKIP_COMPOSER 1
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

# Env for both laravel and node
ENV APP_ENV production
ENV APP_DEBUG false
ENV LOG_CHANNEL stderr
ENV NODE_ENV production

# Allow composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER 1

# Install node, npm vite, and bun
RUN apk add --update nodejs npm
RUN install-php-extensions gd xdebug gmp intl mysqli pgsql sodium soap xsl zip redis curl pdo pdo_mysql bcmath json mbstring pdo_pgsql

CMD ["/start.sh", "bun", "start"]
