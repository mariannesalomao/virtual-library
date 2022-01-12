/**
 *
 * Arquivo responsável pela conexão entre essa API e o Banco de Dados
 *
 */

const { Pool } = require('pg')

// TODO: tirar sua senha!
const pool = new Pool({
  user: 'mariannesalomao',
  password: 'mari0828',
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
