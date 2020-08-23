# Feegow Challenge  by Douglas Gomes de Souza

Esse é um teste focado em design de código, e conhecimento de orientação a objeto. O objetivo é avaliar sua experiênica em escrever código de fácil manutenção, baixo acoplamento, e alta coesão.


## Apresentação do problema

A clínica _Exemplo_ precisa exibir a listagem de seus médicos separados por especialidade em seu site para que seus pacientes tenham acesso. Essa clínica utiliza o Feegow que possui toda a api necessária para isso. 
Link da documentação: https://api.feegow.com.br/api/documentation 

  1- A tela inicial deve ser um SELECT contendo a listagem de todas as especialidades que a clínica trabalha (método na documentação: ``GET /specialties/list``). 
  
  
  2- Quando o usuário escolhe uma especialidade, é executado um AJAX para buscar os profissionais que possuem aquela especialidade e exibido em tela (método na documentação: ``GET /professional/list``). 

  3- Quando o usuário clica em "AGENDAR", será exibido um formulário que o usuário irá preencher e clicar em "ENVIAR".
  
  
  4- Quando o usuário enviar, deverá enviar o formulário por AJAX e salvar todas as informações em um banco de dados relacional contendo: **specialty_id, professional_id, name, cpf, source_id (GET /patient/list-sources), birthdate e date_time**.
      
  Obs: A listagem do campo "Como conheceu" deve vir da api (método ``GET /patient/list-sources`` )
  
  5- Após salvar as informações exibir uma informação ao usuário que os dados foram salvos.


## Apresentação da solução

Foi desenvolvido um site e uma API para a clínica _MedVita (exemplo)_ com foco na qualidade, beleza e usabilidade.

Na página inicial do site, o usuário consegue ver uma curta apresentação da empresa e dos profissionais de cada especialidade.
E em qualquer página que o usuário estiver navegando terá acesso a funcionalidade de consultar os médicos e solicitar atendimento. 
As páginas Sobre e Contato são meramente ilustrativas.

Foram utilizadas as bibliotecas javascript mais modernas do mercado. 
Utilizei a tecnologia SPA (single page application) com objetivo ter transições mais rápidas e carregamento dinâmico
pensando na melhor usabilidade para o usuário.

Todas as requisições para a API Feegow foram tratadas com técnicas de cache para otimizar a performance.

Ao realizar o Agendamento Online, os dados do usuário são processados por uma API independente que por sua armazena os dados no banco de dados da clínica.


## Demonstração Online

[Acessar Demonstração](https://d18l93x2dwh4hs.cloudfront.net)


## Execução Local

Para executar a solução localmente, siga as instruções abaixo:

##### 1. Pré-requisitos para execução local:
* Docker
* docker-compose

Obs.: A solução utiliza conteinerização Docker, não sendo necessário instalar nenhum outro software em sua máquina para rodar a solução.
O ambiente é composto por um container Apache com PHP 7, um servidor de banco de dadados MySQL 5.7 e um container build NodeJS.
 

##### 2. Execução local:
* Clone ou Baixe este repositório em sua maquina.
* Use um terminal de sua preferência, e acesse o diretório baixado, exemplo: `cd Downloads/teste-feegow`
* No terminal, execute o comando a seguir para compilar e subir todo o ambiente Docker:  `docker-compose up -d`
* Aguarde a construção das imagens de container (download de dependências, instalação e compilação).
* Acesse a solução no seu navegador: `http://localhost:8088`

Obs.: Se necessário edite o arquivo `docker-compose.yml` alterando a porta de execução.

##### 3. Verificar os agendamentos gravados no banco de dados:
* Acessar: `http://localhost:8088/api/agendamentos`

##### 4. Remoção local:
- Use um terminal de sua preferência, e acesse o diretório baixado, exemplo: `cd Downloads/teste-feegow`
- No terminal, execute o comando a seguir excluir o ambiente:  `docker-compose down -v`

## Estrutura da solução

* `feegow-backend`: API do site em PHP 7
* `feegow-database`: Estrutura do banco de dados da API
* `feegow-frontend`: Site SPA com Angular
* `.env`: Arquivo de configuração de variáveis de ambiente
* `docker-compose.yml`: Configurações do ambiente de containers Docker. 

## Bibliotecas, frameworks e componentes utilizados
* Backend (API do Site)
  * [Slim Framework](http://www.slimframework.com/) (PHP micro framework).
  * [Eloquent ORM](https://laravel.com/docs/7.x/eloquent).
  * [Composer](https://getcomposer.org/)
* Frontend (Site)
  * [Angular 10](https://angular.io/)
  * [jQuery](https://jquery.com/)
  * [Bootstrap 4](https://getbootstrap.com/)
  * [ngx-mask](https://www.npmjs.com/package/ngx-mask)
  * [FontAwesome](https://fontawesome.com/icons?m=free)

## Desenvolvimento local do Backend

Para o desenvolvimento do backend, siga as instruções abaixo:

##### Requisitos:
* Docker ou 
  * Apache / Nginx
  * PHP 7 ou superior ou suporte a PDO e PDO MySQL
  * Composer
  * MySQL Server

##### Instalação de dependências:
- `cd feegow-backend`
- `composer install`

##### Banco de dados e tabelas (servidor Docker):
- `docker-compose up -d mysql`
- Esse commando já irá subir o banco de dados configurado.

##### Banco de dados e tabelas (outro servidor):
- Utilize o seu próprio banco de dados.
- Utilize o script `dump.sql` no diretóiro `feegow-database` para restaurar o banco de dados.
- Edite o arquivo `feegow-backend\config\database.php` para configurar a conexão 

##### Desenvolver rodando pelo Docker (recomendado):
- `docker-compose up -d apache`
- Esse commando já irá construir a imagem apropriada Apache com PHP.

##### Desenvolver rodando pelo servidor embutido do PHP:
- `cd feegow-backend`
- `php -S localhost:8088`

## Desenvolvimento local do Frontend

Para o desenvolvimento do backend, siga as instruções abaixo:

##### Requisitos:
* NodeJS 10 ou superior
* NPM 


##### Instalação de dependências:
- `cd feegow-frontend`
- `npm install`

##### Executando em modo de desenvolvimento:
- `npm run start`

##### Publicar:
- `npm run build-prod`
