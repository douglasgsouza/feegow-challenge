<?php
/**
 * Configurações do banco de Dados
 *
 * Usa variáveis de ambiente configuradas no Docker
 */

$settings = array(
    'driver'    => 'mysql',
    'host'      => getenv('MYSQL_HOST') . ':' . getenv('MYSQL_PORT'),
    'database'  => getenv('MYSQL_DATABASE'),
    'username'  => getenv('MYSQL_USER'),
    'password'  => getenv('MYSQL_PASSWORD'),
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci'
);

// Instancia o Eloquent ORM
use Illuminate\Database\Capsule\Manager as Capsule;

$capsule = new Capsule;
$capsule->addConnection($settings);
$capsule->setAsGlobal();
$capsule->bootEloquent();
