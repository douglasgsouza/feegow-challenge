<?php

namespace app\models;

use Illuminate\Database\Eloquent\Model;

/**
 * Classe Modelo de Agendamentos
 * @package app\models
 * @property int $id
 * @property int $specialty_id
 * @property int $professional_id
 * @property string $name
 * @property string $cpf
 * @property int $source_id
 * @property string $birthdate
 * @method static find($id)
 */
class Agendamentos extends Model
{
    /**
     * Nome da tabela
     * @var string
     */
    protected $table = 'agendamentos';

    /**
     * Chave primária da tabela
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * Flag que indica se a chave primária é auto-incrementada.
     * @var bool
     */
    public $incrementing  = true;

    /**
     * Os campos que podem ser atribuidos massivamente
     * @var string[]
     */
    protected $fillable = ['specialty_id', 'professional_id', 'name', 'cpf', 'source_id', 'birthdate'];

    /**
     * Flag que indica se o modelo usa campos timestamped
     * @var bool
     */
    public $timestamps = false;
}
