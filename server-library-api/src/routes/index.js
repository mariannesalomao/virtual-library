/**
 *
 * Arquivo responsável pela chamada da API na aplicação no lado do Back-End
 *
 */

const express = require('express')
const router = express.Router()

router.get('/api', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'API Node.js + PostgreSQL',
    version: '1.0.0'
  })
})

module.exports = router
