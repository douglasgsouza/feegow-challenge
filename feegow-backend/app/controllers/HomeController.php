<?php

namespace app\controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Http\StatusCode;

/**
 * Classe controladora da Home da API
 * @package app\controllers
 */
class HomeController
{
    /**
     * Ação Index GET (/)
     * Retorna um texto indicando que a API está em funcionamento
     * @param Request $request
     * @param Response $response
     * @return mixed
     * @noinspection PhpUnusedParameterInspection
     */
    public function index(Request $request, Response $response)
    {
        return $response->withJson('API WORKS', StatusCode::HTTP_OK);
    }
}
