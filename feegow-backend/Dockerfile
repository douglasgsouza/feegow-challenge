FROM php:7.3-apache-stretch

# Instalacao PHP ======================================================================================================
RUN apt-get update && apt-get install -y --no-install-recommends \
    libicu-dev \
    mysql-client \
    libxml2-dev \
    libxslt-dev \
    libzip-dev \
    && docker-php-ext-install -j$(nproc) \
        intl \
        pdo_mysql \
        mbstring \
        opcache \
        zip \
        xsl

# Instalacao Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer

# Limpeza ==============================================================================================================
RUN apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Configuracao =========================================================================================================
RUN a2enmod rewrite proxy deflate headers expires alias ssl setenvif
RUN echo "ServerName localhost" > /etc/apache2/conf-enabled/server-name.conf

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf

# Copia Aplicacao ======================================================================================================
COPY . /var/www/html

# Instala Dependencias
RUN composer install --no-interaction

EXPOSE 80
ENTRYPOINT ["docker-php-entrypoint"]
CMD ["apache2-foreground"]
