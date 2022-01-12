/**
 *
 * Arquivo responsável pelos métodos do CRUD (API - Virtual Library)
 *
 */

const db = require('../config/database')

/**
 * Método responsável por criar um novo leitor (reader)
 */

exports.createReader = async (req, res) => {
  const { name_reader, email, social_network_reader } = req.body

  try {

    const { rows } = await db.query(
      "INSERT INTO tb_readers (name_reader, email, social_network_reader) VALUES ($1, $2, $3)",
      [ name_reader, email, social_network_reader ]
    )

    res.status(201).send({
      message: 'Leitor inserido com sucesso!',
      body: {
        reader: { name_reader, email, social_network_reader }
      }
    })
  } catch (error) {
    console.error('createReader', error)
    res.status(500).send({
      message: 'Ocorreu um erro!'
    })
  }
}

/**
 * Método responsável por listar todos os leitores (readers)
 */

exports.listAllReaders = async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT id_reader, name_reader, email, social_network_reader 
        FROM tb_readers
            ORDER BY name_reader ASC
    `)
    res.status(200).send(rows)

  } catch (error) {
    console.error('listAllReaders', error)
    res.status(500).send({
      message: 'Ocorreu um erro!'
    })
  }
}

/**
 * Método responsável por listar leitores por ID (readers)
 */

exports.findReaderByID = async (req, res) => {
  const { id } = req.params

  try {
    const { rows } = await db.query(`
      SELECT id_reader, name_reader, email, social_network_reader
        FROM tb_readers
        WHERE id_reader = $1`,
    [id])

    if (!rows.length) {
      throw 'reader_not_found'
    }
    res.status(200).send(rows[0])
  } catch (error) {
    console.error('findReaderByID', error)

    if (error === 'reader_not_found') {
      res.status(404).send({
        message: 'Leitor não encontrado.'
      })
    } else {
      res.status(500).send({
        message: 'Ocorreu um erro.'
      })
    }
  }
}

/**
 * Método responsável por atualizar um determinado leitor por ID (readers)
 */

exports.updateReaderByID = async (req, res) => {
  const { id } = req.params

  try {
    const { name_reader, email, social_network_reader } = req.body
    const { rows } = await db.query(`
      UPDATE tb_readers
      SET 
          name_reader = $1,
          email = $2,
          social_network_reader = $3
      WHERE id_reader = $4`,
      [name_reader, email, social_network_reader])

    res.status(200).send({
      message: 'Leitor atualizado com sucesso.'
    })
  } catch (error) {
    console.error('updateReaderByID', error)
    res.status(500).send({
      message: 'Ocorreu um erro'
    })
  }
}

/**
 * Método responsável por deletar um determinado leitor por ID (readers)
 */

exports.deleteReaderByID = async (req, res) => {
  const { id } = req.params
  try {
    await db.query(`
      DELETE FROM tb_readers WHERE id_reader = $1`,
      [id])
    res.status(200).send({
      message: 'Leitor deletado com sucesso.'
    })
  } catch (error) {
    console.error('deleteReaderByID', error)
    res.status(500).send({
      message: 'Ocorreu um erro'
    })
  }
}










