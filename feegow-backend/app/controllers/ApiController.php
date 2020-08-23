<?php


namespace app\controllers;

use DateTime;
use Psr\Container\ContainerInterface;

/**
 * Classe Base da API
 * @package app\controllers
 */
class ApiController
{

    /**
     * App Container
     * @var ContainerInterface
     */
    protected $container;

    private $validationError;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    /**
     * Valida o corpo do request
     * @param array $validationRules Regras de validação
     * @param array $body Corpo da requisição
     * @return array|false
     */
    public function validate(array $validationRules, array $body) {

        $validatedFields = [];
        foreach ($validationRules as $fieldKey => $validationRule) {

            $value          = array_key_exists($fieldKey, $body) ? $body[$fieldKey] : null;
            $validationArgs = explode('|', $validationRule);

            foreach ($validationArgs as $validationArg) {
                switch ($validationArg) {

                    // Valida campo obrigatório
                    case 'required':
                        if (empty($value)) {
                            $this->validationError = ['field' => $fieldKey, 'message' => "O campo '$fieldKey' é obrigatório."];
                            return false;
                        }
                        break;

                    // Valida campo inteiro
                    case 'int':
                        if (!filter_var($value, FILTER_VALIDATE_INT)) {
                            $this->validationError = ['field'   => $fieldKey, 'message' => "O campo '$fieldKey' não é número interiro válido."];
                            return false;
                        }
                        break;

                    // Valida campo string e sanitiza a string
                    case 'string':
                        if ($value !== null) {
                            $value = trim(filter_var($value, FILTER_SANITIZE_STRING));
                            if ($value === false) {
                                $this->validationError = ['field' => $fieldKey, 'message' => "O campo '$fieldKey' não uma string válida."];
                                return false;
                            }
                        }
                        break;

                    // Remove todos os caracteres não numéricos deixando somente números
                    case 'onlynumbers':
                        if ($value !== null) {
                            $value = preg_replace('/\D/', '', $value);
                        }
                        break;

                    // Valida data no formato Y-m-d
                    case 'date':
                        $format = 'Y-m-d';
                        $date = DateTime::createFromFormat($format, $value);
                        if (!$date || $date->format($format) != $value) {
                            $this->validationError = ['field' => $fieldKey, 'message' => "O campo '$fieldKey' não uma data válida."];
                            return false;
                        }
                        break;
                }
            }
            $validatedFields[$fieldKey] = $value;
        }
        return $validatedFields;
    }

    public function  getValidationError() {
        return $this->validationError;
    }

}
