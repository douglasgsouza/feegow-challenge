<?php

/**
 * Bootstrap da aplicação API com Slim Framework
 *
 * @noinspection PhpUnusedParameterInspection
 */

use Slim\App;

require __DIR__ . '/../../vendor/autoload.php';

$debug = false;

$app = new App([
    'settings' => [
        'displayErrorDetails' => $debug,
    ]
]);

if (!$debug) {
    $c = $app->getContainer();

    $c['errorHandler'] = function ($c) {
        return function ($request, $response) use ($c) {
            return $response->withJson(['message' => 'Internal server error'], 500);
        };
    };
}

require_once __DIR__ . '/../../app/config/database.php';
require_once __DIR__ . '/../../app/config/routes.php';

try {
    $app->run();
} catch (Throwable $e) {
    echo 'Failed to run application';
}

