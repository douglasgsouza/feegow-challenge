<?php
/**
 * Rotas da API
 */

$app->get('/', app\controllers\HomeController::class . ':index');

$app->get('/agendamentos', app\controllers\AgendamentoController::class . ':index');
$app->get('/agendamentos/{id}', app\controllers\AgendamentoController::class . ':view');
$app->post('/agendamentos', app\controllers\AgendamentoController::class . ':create');
