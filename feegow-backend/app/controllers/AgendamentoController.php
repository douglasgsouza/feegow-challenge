<?php

namespace app\controllers;

use app\models\Agendamentos;
use Exception;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Http\StatusCode;

/**
 * Classe controladora de Agendamento
 * Responsável pelos métodos REST de Agendamento
 * @package app\controllers
 */
class AgendamentoController extends ApiController
{
    /**
     * Ação Index GET /agendamentos
     * Lista todos os agendamentos gravados no banco de dados
     * @param Request $request
     * @param Response $response
     * @return mixed
     * @noinspection PhpUnusedParameterInspection
     */
    public function index(Request $request, Response $response)
    {
        $result = Agendamentos::all();
        return $response->withJson($result, StatusCode::HTTP_OK);
    }

    /**
     * Ação View GET /agendamentos/{id}
     * Retorna os dados do agendamento com o ID especificado.
     * @param Request $request
     * @param Response $response
     * @param $args
     * @return mixed
     * @noinspection PhpUnusedParameterInspection
     */
    public function view(Request $request, Response $response, $args)
    {
        $id = filter_var($args['id'], FILTER_SANITIZE_NUMBER_INT);
        if ($id) {
            $model = Agendamentos::find($id);
            if ($model) {
                return $response->withJson($model, StatusCode::HTTP_OK);
            } else {
                return $response->withJson(['error' => ['message' => 'Não contrado']], StatusCode::HTTP_NOT_FOUND);
            }
        } else {
            return $response->withJson(['error' => ['message' => 'Requisição inválida']], StatusCode::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Ação Create POST /agendamentos
     * Grava um agendamento no banco de dados
     * @param Request $request
     * @param Response $response
     * @return mixed
     */
    public function create(Request $request, Response $response)
    {
        $body = $request->getParsedBody();

        if (empty($body)) {
            return $response->withJson(['error' => ['message' => 'Requisição inválida']], StatusCode::HTTP_BAD_REQUEST);
        }

        // Valida e trata os campos da requisição
        $validationRules = [
            'specialty_id'    => 'required|int',
            'professional_id' => 'required|int',
            'name'            => 'required|string',
            'cpf'             => 'required|string|onlynumbers',
            'source_id'       => 'required|int',
            'birthdate'       => 'required|string|date'
        ];

        if (!$validatedFields = $this->validate($validationRules, $body)) {
            return $response->withJson(['error' => $this->getValidationError()], StatusCode::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Grava os campos no banco de dados
        try {
            $model = new Agendamentos($validatedFields);
            $model->save();

            return $response->withJson($model, StatusCode::HTTP_CREATED);

        } catch (Exception $ex) {
            return $response->withJson(['error' => ['message' => 'Internal server error']], StatusCode::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
