# Processador de Arquivos de Transações

Este projeto é um processador de arquivos de transações que lê arquivos JSON e TXT, processa os dados e os armazena em um banco de dados MySQL.

## Estrutura do Projeto

- `src/`: Contém o código-fonte do projeto.
  - `config/`: Configurações do banco de dados.
    - `database.js`: Configuração e conexão com o banco de dados.
  - `models/`: Modelos Sequelize para as tabelas do banco de dados.
    - `clearing.js`: Modelo para a tabela `clearing`.
    - `ep747.js`: Modelo para a tabela `ep747`.
  - `process/`: Lógica de processamento dos arquivos.
    - `clearing.js`: Processamento de arquivos JSON para a tabela `clearing`.
    - `ep747.js`: Processamento de arquivos TXT para a tabela `ep747`.
    - `index.js`: Exporta os módulos de processamento.
  - `index.js`: Ponto de entrada do aplicativo.

- `query/`: Contém consultas SQL para análise dos dados.
  - `clearing.sql`: Consultas relacionadas à tabela `clearing`.
  - `ep747.sql`: Consultas relacionadas à tabela `ep747`.

- `files/`: Diretório onde os arquivos de entrada devem ser colocados.
  - `.gitkeep`: Arquivo vazio para manter o diretório no controle de versão.

## Configuração

1. Clone o repositório:
   ```sh
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_REPOSITORIO>
    ```
2. Selecione a versão do node
    ```sh
    nvm install
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Configure o banco de dados no arquivo `.env.example`, crie uma cópia do arquivo para ficar somente `.env`. Modifique o valor das variáveis conforme a configuração do seu banco

    ```
    DB_NAME=slice
    DB_USER=root
    DB_PASS=root
    DB_HOST=127.0.0.1
    DB_DIALECT=mysql
    DB_PORT=3306
    ```
---

Uso

1. Coloque os arquivos de entrada no diretório files.
2. Execute o script de processamento:
    ```sh
    npm run process
    ```


npm run process
Consultas SQL

As consultas SQL para análise dos dados estão localizadas no diretório [query](query).


