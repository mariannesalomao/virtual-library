/**
 *
 * Arquivo responsável pela conexão entre essa API e o Banco de Dados
 *
 */

const { Pool } = require('pg')

const pool = new Pool({
  user: 'SEU_USUÁRIO_NO_DATABASE',
  password: 'SUA_SENHA',
  host: 'localhost',
  port: 5432,
  database: 'virtual-library'
})

pool.on('error', (error, client) => {
  console.log('Unexpected error on idle client', error)
  process.exit(-1)
})

pool.on('connect', () => {
  console.log('Base de Dados conectado com sucesso!')
})

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params)
}
